import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, MessageSquare, Brain, HelpCircle, PhoneCall } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, path }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login', { state: { from: path } });
    }
  };

  return (
    <div 
      className="glass-card p-6 rounded-xl cursor-pointer transform transition hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-white mr-3" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const services = [
    {
      title: 'Book Appointment',
      description: 'Schedule a consultation with our healthcare professionals',
      icon: Calendar,
      path: '/appointments',
    },
    {
      title: 'Chat Support',
      description: 'Get instant help from our AI-powered chatbot',
      icon: MessageSquare,
      path: '/chat',
    },
    {
      title: 'Mental Health Check',
      description: 'Take a quick assessment of your mental well-being',
      icon: Brain,
      path: '/mental-health',
    },
    {
      title: 'Help & Support',
      description: 'Find answers to common questions and get assistance',
      icon: HelpCircle,
      path: '/help',
    },
    {
      title: 'Emergency',
      description: 'Immediate medical attention and ambulance service',
      icon: PhoneCall,
      path: '/emergency',
    },
  ];

  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <header className="bg-transparent py-4">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Smart Healthcare</h1>
        </nav>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="text-center mb-16 floating">
          <h2 className="text-4xl font-bold text-white mb-4">Healthcare Services</h2>
          <p className="text-xl text-white/70">
            Access quality healthcare services from the comfort of your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              path={service.path}
            />
          ))}
        </div>

        <div className="mt-16">
          <div className="glass-card p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
            <p className="text-white/70 mb-6">
              Our emergency services are available 24/7. Don't hesitate to reach out.
            </p>
            <button 
              onClick={() => window.location.href = '/emergency'}
              className="glass-button px-8 py-3 rounded-xl text-white font-semibold"
            >
              Contact Emergency Services
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/70">
          <p>&copy; 2024 Smart Healthcare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 