import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Activity, Settings } from 'lucide-react';

export default function Admin() {
  const adminStats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Appointments',
      value: '156',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Active Sessions',
      value: '45',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'System Status',
      value: 'Healthy',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-xl text-blue-200">Monitor and manage your healthcare system</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-blue-200">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add recent activity items here */}
              <p className="text-blue-200">Coming soon...</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
            <div className="space-y-4">
              {/* Add settings controls here */}
              <p className="text-blue-200">Coming soon...</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 