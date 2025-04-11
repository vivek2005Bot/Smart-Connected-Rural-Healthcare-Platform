import { useState } from 'react';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HelpSupport() {
  const navigate = useNavigate();
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFooterClick = (path: string) => {
    navigate(path);
  };

  const handleStartChat = () => {
    setShowChatModal(true);
    // After 1.5 seconds, redirect to chat page
    setTimeout(() => {
      setShowChatModal(false);
      navigate('/chat');
    }, 1500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email sending
    setShowEmailForm(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setEmailData({ subject: '', message: '' });
    }, 3000);
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+911800-123-4567';
  };

  const faqItems = [
    {
      id: 1,
      question: 'How do I book an appointment?',
      answer: 'To book an appointment, go to the Appointments page, select your preferred doctor, choose an available time slot, and confirm your booking. You will receive a confirmation notification.',
      icon: '📅'
    },
    {
      id: 2,
      question: 'How can I access my medical records?',
      answer: 'Your medical records are securely stored in your profile. Navigate to the Profile section and select "Medical Records" to view your complete health history.',
      icon: '📋'
    },
    {
      id: 3,
      question: 'What should I do in case of an emergency?',
      answer: 'For emergencies, go to the Emergency Services page where you can find emergency contact numbers and first aid guides. If it\'s a life-threatening situation, call 108 immediately.',
      icon: '🚨'
    },
    {
      id: 4,
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team through the Chat Support feature available 24/7. Alternatively, you can email us at support@healthcareplatform.com',
      icon: '💬'
    }
  ];

  const supportChannels = [
    {
      id: 1,
      name: 'Live Chat',
      description: '24/7 instant support',
      icon: '💬',
      action: 'Start Chat',
      handler: handleStartChat
    },
    {
      id: 2,
      name: 'Email Support',
      description: 'support@healthcareplatform.com',
      icon: '📧',
      action: 'Send Email',
      handler: () => setShowEmailForm(true)
    },
    {
      id: 3,
      name: 'Phone Support',
      description: '+91 1800-123-4567',
      icon: '📞',
      action: 'Call Now',
      handler: handleCallNow
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Help & Support</h1>
          <p className="text-xl text-blue-200">We're here to help you with any questions or concerns</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <motion.div
            id="faq-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-4">
              {faqItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6"
                >
                  <div className="flex items-start">
                    <span className="text-4xl mr-4">{item.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.question}</h3>
                      <p className="text-blue-200">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Channels Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Support Channels</h2>
            <div className="grid grid-cols-1 gap-4">
              {supportChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{channel.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{channel.name}</h3>
                        <p className="text-blue-200">{channel.description}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={channel.handler}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      {channel.action}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-3xl shadow-xl"
            >
              <p className="text-xl font-semibold text-gray-800">Redirecting to chat support...</p>
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Form Modal */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Email</h3>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>

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
              className="flex flex-col items-center text-white hover:text-blue-300 transition-colors"
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
              className="flex flex-col items-center text-white hover:text-blue-300 transition-colors"
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
              className="flex flex-col items-center text-white hover:text-blue-300 transition-colors"
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
              className="flex flex-col items-center text-white hover:text-blue-300 transition-colors"
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