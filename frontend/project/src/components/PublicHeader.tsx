import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Brain, Phone, Shield } from 'lucide-react';

const PublicHeader: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
    { label: 'Mental Health', path: '/mental-health', icon: Brain },
    { label: 'Emergency', path: '/emergency', icon: Phone },
    { label: 'Admin', path: '/admin', icon: Shield },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Healthcare
            </span>
          </div>

          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader; 