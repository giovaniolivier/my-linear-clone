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
      navigate("/");
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