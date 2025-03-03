import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: true, // Autorise toutes les origines en développement
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

const codes = {}; // Stocke temporairement les codes (à remplacer par une DB en prod)

// Ajoute une expiration aux codes
const CODE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

// Fonction de validation d'email
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Vérification de la connexion SMTP
const verifySMTP = () => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });
};

app.post("/send-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email reçu:", email);

    if (!email) {
      return res.status(400).json({ error: "Email requis" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Adresse email invalide" });
    }

    // Vérification des variables d'environnement
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Les variables EMAIL_USER ou EMAIL_PASS ne sont pas définies !");
      return res.status(500).json({ error: "Configuration du serveur email incorrecte" });
    }

    // Générer le code de validation
    const code = crypto.randomInt(100000, 999999).toString();
    codes[email] = {
      code,
      timestamp: Date.now(), // Ajout de l'horodatage
    };
    console.log("Code généré:", code);

    // Configuration du transporteur
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Vérifier la connexion au SMTP
    try {
      await verifySMTP();
      console.log("Serveur SMTP prêt à envoyer des emails.");
    } catch (error) {
      console.error("Erreur de connexion au SMTP:", error);
      return res.status(500).json({
        error: "Problème de connexion au serveur email",
        details: error.message,
      });
    }

    // Configuration de l'email à envoyer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Votre code de connexion",
      text: `Votre code de connexion est : ${code}`,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
    res.json({ message: "Email envoyé avec succès" });
    
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Échec de l'envoi de l'email", details: error.message });
  }
});

// Route pour vérifier le code
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const codeData = codes[email];

  if (codeData) {
    const isExpired = Date.now() - codeData.timestamp > CODE_EXPIRATION_TIME;

    if (isExpired) {
      delete codes[email]; // Supprime le code expiré
      return res.status(400).json({ error: "Le code a expiré" });
    }

    if (codeData.code === code) {
      delete codes[email]; // Supprime le code après validation
      return res.json({ message: "Code valide, connexion réussie" });
    }
  }

  res.status(400).json({ error: "Code invalide" });
});

// Démarrer le serveur
app.listen(5000, () => console.log("🚀 Serveur démarré sur http://localhost:5000"));
