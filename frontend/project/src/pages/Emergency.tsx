import PublicHeader from '../components/PublicHeader';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Emergency() {
  const navigate = useNavigate();

  const handleFooterClick = (path: string) => {
    navigate(path);
  };

  const emergencyServices = [
    {
      id: 1,
      title: 'Emergency Hotline',
      description: 'Immediate assistance for life-threatening situations',
      number: '911',
      icon: '🚨'
    },
    {
      id: 2,
      title: 'Poison Control',
      description: '24/7 assistance for poison-related emergencies',
      number: '1-800-222-1222',
      icon: '⚠️'
    },
    {
      id: 3,
      title: 'Suicide Prevention',
      description: '24/7 support for mental health crises',
      number: '988',
      icon: '🤝'
    },
    {
      id: 4,
      title: 'Domestic Violence',
      description: 'Support for domestic abuse situations',
      number: '1-800-799-7233',
      icon: '🛡️'
    },
    {
      id: 5,
      title: 'Child Abuse',
      description: 'Report child abuse or neglect',
      number: '1-800-422-4453',
      icon: '👶'
    },
    {
      id: 6,
      title: 'Medical Advice',
      description: '24/7 nurse advice line',
      number: '1-800-222-1222',
      icon: '🏥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      <PublicHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Emergency Services</h1>
          <p className="text-xl text-indigo-200">Immediate assistance when you need it most</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{service.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-indigo-200">{service.description}</p>
                </div>
              </div>

              <motion.a
                href={`tel:${service.number}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-xl transition-colors text-xl font-semibold"
              >
                {service.number}
              </motion.a>
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