import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

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
        <button 
            className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-[#575bc7] py-4 text-white text-[12px] transition-colors duration-300 hover:bg-[#6c78e6]" 
            onClick={handleLogin}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Continue with Google
        </button>
        <div className="mb-6 mt-[-5px] text-center text-[12px] text-gray-400">
          You used google to log in last time
        </div>
        <button className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
          <span className="mr-2">Continue with email</span>
        </button>
        <button className="mb-4 flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
          Continue with SAML SSO
        </button>
        <button className="flex w-full items-center justify-center font-bold rounded-lg bg-gray-700 py-4 text-white text-[12px] transition-colors duration-300 hover:bg-gray-600">
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