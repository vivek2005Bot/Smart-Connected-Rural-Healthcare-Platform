import React from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MentalHealth() {
  const navigate = useNavigate();

  const handleFooterClick = (path: string) => {
    navigate(path);
  };

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
      icon: '🧘'
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
      icon: '😌'
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
      icon: '🌞'
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
      icon: '🧠'
    },
    {
      id: 5,
      title: 'Sleep Hygiene',
      description: 'Learn how to improve your sleep quality and establish healthy sleep patterns',
      techniques: [
        'Consistent sleep schedule',
        'Relaxing bedtime routine',
        'Screen time management',
        'Comfortable sleep environment',
        'Stress reduction before bed'
      ],
      icon: '😴'
    },
    {
      id: 6,
      title: 'Professional Support',
      description: 'Access professional mental health resources and support services',
      techniques: [
        'Therapy sessions',
        'Support groups',
        'Crisis hotlines',
        'Online counseling',
        'Mental health apps'
      ],
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Mental Health Resources</h1>
          <p className="text-xl text-indigo-200">Find support and resources for your mental well-being</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentalHealthResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{resource.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{resource.title}</h3>
                  <p className="text-indigo-200">{resource.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Techniques:</h4>
                <ul className="space-y-2">
                  {resource.techniques.map((technique, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-indigo-200 flex items-start"
                    >
                      <span className="text-white mr-2">•</span>
                      {technique}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border-t border-white/20 py-4"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFooterClick('/appointments')}
              className="flex flex-col items-center text-white hover:text-indigo-300 transition-colors"
            >
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Appointments</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFooterClick('/chat')}
              className="flex flex-col items-center text-white hover:text-indigo-300 transition-colors"
            >
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">Chat</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFooterClick('/emergency')}
              className="flex flex-col items-center text-white hover:text-indigo-300 transition-colors"
            >
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Emergency</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFooterClick('/profile')}
              className="flex flex-col items-center text-white hover:text-indigo-300 transition-colors"
            >
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm">Profile</span>
            </motion.button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}