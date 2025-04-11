import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Calendar, Phone, MessageCircle, BookOpen, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentalHealth = () => {
  const navigate = useNavigate();

  const mentalHealthResources = [
    {
      id: 1,
      title: 'Stress Management',
      description: 'Learn effective techniques to manage and reduce stress in your daily life',
      techniques: [
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Mindfulness meditation',
        'Time management strategies',
        'Healthy lifestyle habits'
      ],
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: 'Anxiety Relief',
      description: 'Discover ways to cope with anxiety and improve your mental well-being',
      techniques: [
        'Grounding techniques',
        'Cognitive behavioral strategies',
        'Regular exercise',
        'Healthy sleep habits',
        'Social support'
      ],
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: 'Depression Support',
      description: 'Find resources and strategies to manage depression symptoms',
      techniques: [
        'Regular physical activity',
        'Social connection',
        'Professional counseling',
        'Medication management',
        'Self-care practices'
      ],
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: 'Mindfulness & Meditation',
      description: 'Explore mindfulness practices to improve mental clarity and focus',
      techniques: [
        'Guided meditation',
        'Body scan exercises',
        'Mindful breathing',
        'Gratitude practice',
        'Mindful walking'
      ],
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  const supportServices = [
    {
      title: "Online Counseling",
      description: "Connect with licensed therapists through secure video sessions",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
      action: () => navigate('/chat')
    },
    {
      title: "Support Groups",
      description: "Join virtual support groups led by mental health professionals",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      action: () => navigate('/appointments')
    },
    {
      title: "Self-Help Resources",
      description: "Access guided meditation, stress management, and wellness tips",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      action: () => {}
    },
    {
      title: "Crisis Support",
      description: "24/7 emergency mental health support and crisis intervention",
      icon: <Phone className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      action: () => navigate('/emergency')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mental Health Support
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Your mental well-being matters. Access professional support, resources, and tools to help you on your journey to better mental health.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mental Health Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Mental Health Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentalHealthResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300">
                <div className={`bg-gradient-to-r ${resource.color} p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-purple-200 mb-4">{resource.description}</p>
                <div className="space-y-2">
                  {resource.techniques.map((technique, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center space-x-2 text-purple-200"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{technique}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Support Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onClick={service.action}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                <div className={`bg-gradient-to-r ${service.color} p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-purple-200">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Need Immediate Support?</h2>
          <p className="text-xl text-purple-200 mb-8">
            Our mental health professionals are available 24/7 to help you.
          </p>
          <button
            onClick={() => navigate('/emergency')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Emergency Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MentalHealth;