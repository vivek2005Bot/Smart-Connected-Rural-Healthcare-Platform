import PublicHeader from '../components/PublicHeader';
import { motion } from 'framer-motion';

export default function Emergency() {
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
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-semibold">
            If you are experiencing a life-threatening emergency, immediately dial 911 or your local emergency number.
          </p>
        </div>
      </div>
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
    </div>
  );
}