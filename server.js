import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔌 Connexion à MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "linear_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("💾 Connecté à MySQL");
});

// 📩 Configurer l'envoi d'email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 Envoyer un code par email
app.post("/send-code", async (req, res) => {
  try {
      console.log("Requête reçue:", req.body);
      const { email } = req.body;
      if (!email) throw new Error("Email manquant");

      const code = crypto.randomInt(100000, 999999).toString();

      console.log("Génération du code:", code);

      await db.promise().query("DELETE FROM verification_codes WHERE email = ?", [email]);

      await db.promise().query("INSERT INTO verification_codes (email, code) VALUES (?, ?)", [email, code]);

      console.log("Code enregistré en BD");

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Votre code de confirmation",
          text: `Votre code de confirmation est : ${code}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email envoyé:", info.response);

      res.status(200).send({ message: "Code envoyé !" });
  } catch (err) {
      console.error("Erreur serveur:", err);
      res.status(500).send({ message: "Erreur interne", error: err.message });
  }
});


// ✅ Vérifier le code
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  db.query("SELECT * FROM verification_codes WHERE email = ? AND code = ? LIMIT 1", [email, code], (err, results) => {
    if (err) return res.status(500).send({ message: "Erreur BD" });

    if (results.length === 0) return res.status(400).send({ message: "Code invalide ou expiré !" });

    // 🗑 Supprimer le code après vérification
    db.query("DELETE FROM verification_codes WHERE email = ?", [email]);
    res.status(200).send({ message: "Code vérifié avec succès !" });
  });
});

// 🚀 Démarrer le serveur
app.listen(5000, () => console.log("🚀 Serveur sur http://localhost:5000"));
