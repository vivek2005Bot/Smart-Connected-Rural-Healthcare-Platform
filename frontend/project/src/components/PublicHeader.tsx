import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PublicHeader() {
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
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            <Shield size={18} />
            <span>Admin</span>
          </motion.button>
        </div>
      </nav>
    </header>
  );
} 