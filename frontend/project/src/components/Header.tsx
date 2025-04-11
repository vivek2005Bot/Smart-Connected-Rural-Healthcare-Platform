import React from 'react';
import { User, LogIn, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-transparent">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart size={24} className="text-blue-500 animate-pulse" />
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent cursor-pointer" 
            onClick={() => navigate('/')}
          >
            HealthCare
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
            onClick={() => navigate('/login')}
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
          <button 
            className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg text-white"
            onClick={() => navigate('/register')}
          >
            <User size={20} />
            <span>Register</span>
          </button>
        </div>
      </nav>
    </header>
  );
}