import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Zap, Globe, Heart, Brain, PhoneCall, Shield, Clock, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
        setIsVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Telemedicine",
      description: "Access healthcare professionals remotely through video consultations",
      icon: <PhoneCall className="w-12 h-12" />,
      color: "from-blue-500/30 to-purple-500/30"
    },
    {
      title: "Emergency Support",
      description: "Quick access to emergency services and immediate medical assistance",
      icon: <Activity className="w-12 h-12" />,
      color: "from-red-500/30 to-orange-500/30"
    },
    {
      title: "Mental Health",
      description: "Professional mental health support and counseling services",
      icon: <Brain className="w-12 h-12" />,
      color: "from-purple-500/30 to-pink-500/30"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Healthcare Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-blue-900/60 to-gray-900/70" />
      </div>

      {/* 3D Background Elements */}
      <div className="absolute inset-0 perspective-1000">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 1000}px)`,
            }}
            animate={{
              y: [0, -300, 0],
              x: [0, 150, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="relative mb-8 transform-gpu"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              }}
              whileHover={{
                transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
              }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.h1 
                className="relative text-5xl md:text-7xl font-bold text-white mb-6 transform-gpu"
                animate={{
                  scale: [1, 1.02, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                }}
              >
                Smart Connected Rural Healthcare
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl transform-gpu"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                textShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
              }}
            >
              Bringing quality healthcare services to rural communities through innovative technology and telemedicine solutions.
            </motion.p>

            <motion.div
              className="relative inline-block cursor-pointer transform-gpu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => handleNavigation('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-lg blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white font-semibold py-4 px-12 rounded-full text-xl shadow-lg overflow-hidden transform-gpu"
                style={{
                  transform: 'translateZ(20px)',
                }}
              >
                <motion.span
                  className="relative z-10 flex items-center gap-3"
                  animate={{
                    scale: [1, 1.05, 1],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Get Started
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transform-gpu"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors transform-gpu"
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)',
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transform-gpu`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transform-gpu"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {[
              { value: '10K+', label: 'Patients Served', color: 'blue-500' },
              { value: '500+', label: 'Healthcare Providers', color: 'purple-500' },
              { value: '24/7', label: 'Emergency Support', color: 'red-500' },
              { value: '95%', label: 'Satisfaction Rate', color: 'green-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group transform-gpu"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div 
                  className={`text-4xl font-bold text-white mb-2 group-hover:text-${stat.color} transition-colors transform-gpu`}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    textShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-20 flex flex-wrap justify-center gap-8 items-center transform-gpu"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {[
              { icon: <Shield className="w-6 h-6 text-green-500" />, text: 'HIPAA Compliant' },
              { icon: <Clock className="w-6 h-6 text-blue-500" />, text: '24/7 Support' },
              { icon: <Users className="w-6 h-6 text-purple-500" />, text: 'Certified Professionals' },
              { icon: <Award className="w-6 h-6 text-yellow-500" />, text: 'Industry Recognized' },
            ].map((indicator, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors transform-gpu"
                whileHover={{ scale: 1.05, x: 5, rotateY: 5 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {indicator.icon}
                <span>{indicator.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 