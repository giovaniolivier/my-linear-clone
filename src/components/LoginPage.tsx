import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="">
        <img
          src="/logo.png"
          alt="Linear Logo"
          className="mx-auto mb-6 h-12"
        />
        <h2 className="mb-6 text-center text-[16px] font-bold text-white">
          Log in to Linear
        </h2>
        <button 
            className="mb-4 flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-blue-700" 
            onClick={handleLogin}
        >
          <FcGoogle className="mr-2 h-6 w-6" />
          Continue with Google
        </button>
        <div className="mb-8 text-center text-[12px] text-gray-400">
          You used google to log in last time
        </div>
        <button className="mb-4 flex w-full items-center justify-center rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
          <span className="mr-2">Continue with email</span>
        </button>
        <button className="mb-4 flex w-full items-center justify-center rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
          Continue with SAML SSO
        </button>
        <button className="flex w-full items-center justify-center rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
          Log in with Passkey
        </button>
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