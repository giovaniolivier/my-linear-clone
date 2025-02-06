import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface User {
  name: string;
  email: string;
  picture: string;
}

const LoginButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ 
  children, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600"
  >
    {children}
  </button>
);

const LoginPage: React.FC = () => { 
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<User>(credentialResponse.credential);
        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
        localStorage.setItem("username", decoded.name);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirige vers la page de connexion si l'utilisateur est déconnecté
    }
  }, []);

  return (
    <div className="flex pt-10 h-screen items-center justify-center bg-black">
      <div className="w-[280px]">
        <img
          src="/logo.png"
          alt="Linear Logo"
          className="mx-auto mb-6 h-12"
        />
        <h2 className="mb-6 pt-4 text-center text-[16px] font-bold text-white">
          Log in to Linear
        </h2>
        
        <div className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-[#575bc7] py-4 text-white text-[12px] transition-colors duration-300 hover:bg-[#6c78e6]">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.error('Login Failed')}
          />
        </div>

        <div className="mb-6 mt-[-5px] text-center text-[12px] text-gray-400">
          You used Google to log in last time
        </div>

        <LoginButton>Continue with email</LoginButton>
        <LoginButton>Continue with SAML SSO</LoginButton>
        <LoginButton>Log in with Passkey</LoginButton>

        <div className="mt-6 text-center text-[12px] text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;