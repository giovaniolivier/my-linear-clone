import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface User {
  name: string;
  email: string;
  picture: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<User>(credentialResponse.credential);
        setUser(decoded);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("username", decoded.name);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  // 📩 Envoyer le code par email
  const sendCode = async () => {
    try {
      await axios.post("http://localhost:5000/send-code", { email });
      setMessage("Code envoyé à votre email !");
      setShowEmailForm(false);
      setShowCodeForm(true);
    } catch (error) {
      setMessage("Erreur lors de l'envoi du code.");
    }
  };
  

   // ✅ Vérifier le code
   const verifyCode = async () => {
    try {
      await axios.post("http://localhost:5000/verify-code", { email, code });
      setMessage("Code vérifié avec succès !");
      navigate("/dashboard");
    } catch (error) {
      setMessage("Code invalide !");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex pt-10 h-screen items-center justify-center bg-black">
      <div className="w-[280px]">
        <img src="/logo.png" alt="Linear Logo" className="mx-auto mb-6 h-12" />

        {showEmailForm ? (
          <div className="flex flex-col items-center">
            <h2 className="mb-6 pt-4 text-center text-[16px] font-bold text-white">
              What's your email address?
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="mt-3 mb-4 w-full p-2 bg-[#1c1d1f] py-4 focus:outline-none text-[12px] rounded-md text-white"
            />
            <button
              className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-[#26282f] py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
              onClick={sendCode}
            >
              Continue with Email
            </button>
            <button
              className="mt-2 text-white hover:underline"
              onClick={() => setShowEmailForm(false)}
            >
              Back to Log in
            </button>
          </div>
        ) : showCodeForm ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Check your email</h2>
            <p className="text-gray-400 text-center mb-4">{message}</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="mt-3 mb-4 w-full p-2 bg-[#1c1d1f] py-4 focus:outline-none text-[12px] rounded-md text-white"
            />
            <button
              className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-[#26282f] py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
              onClick={verifyCode}
            >
              Verify Code
            </button>
            <button
              className="mt-4 text-blue-400 underline"
              onClick={() => setShowCodeForm(false)}
            >
              Back to login
            </button>
          </div>
        ) : (
          <div>
            <h2 className="mb-6 pt-4 text-center text-[16px] font-bold text-white">
              Log in to Linear
            </h2>
            <div className="relative w-full max-w-md">
              <div className="mb-4 flex text-white text-[12px] font-bold w-full items-center justify-center gap-3 rounded-lg bg-[#575bc7] py-4 px-4 transition-all duration-300 hover:bg-[#6c78e6] shadow-md">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                <span>Continue with Google</span>
                <div className="absolute inset-0 opacity-0">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.error('Login Failed')}
                    useOneTap
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 mt-[-5px] text-center text-[12px] text-gray-400">
              You used Google to log in last time
            </div>

            <button
              className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
              onClick={() => setShowEmailForm(true)}
            >
              Continue with Email
            </button>
            <button
              className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
            >
              Continue with SAML SSO
            </button>
            <button
              className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
            >
              Log in with Passkey
            </button>

            <div className="mt-6 text-center text-[12px] text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Learn more
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
