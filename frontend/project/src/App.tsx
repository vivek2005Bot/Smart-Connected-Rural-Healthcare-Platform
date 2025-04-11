import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, MessageSquare, Brain, HelpCircle, PhoneCall } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import Appointments from './pages/Appointments';
import ChatSupport from './pages/ChatSupport';
import MentalHealth from './pages/MentalHealth';
import Help from './pages/Help';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Register from './pages/Register';

function HomePage() {
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
      <Header />
      
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

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/chat" element={<ChatSupport />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/help" element={<Help />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App