import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment through our Appointments page. Simply select your preferred healthcare provider, choose an available time slot, and confirm your booking. You'll receive a confirmation email with the appointment details."
    },
    {
      question: "What should I do in case of a medical emergency?",
      answer: "In case of a medical emergency, immediately navigate to our Emergency page or call our 24/7 emergency hotline. Our emergency response team is available round the clock to provide immediate assistance and guidance."
    },
    {
      question: "How can I access my medical records?",
      answer: "Your medical records can be accessed through your Profile page. Click on the 'Medical Records' section to view your complete health history, test results, and prescribed medications. All records are securely stored and encrypted."
    },
    {
      question: "Is my health information secure?",
      answer: "Yes, we take your privacy very seriously. All your health information is encrypted and stored securely following HIPAA guidelines. We use industry-standard security protocols to protect your personal and medical data."
    },
    {
      question: "How do I connect with a mental health professional?",
      answer: "You can connect with mental health professionals through our Mental Health page. We offer various options including video consultations, chat support, and in-person appointments. All our mental health professionals are licensed and experienced."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, insurance, and digital payment solutions. You can manage your payment preferences and view billing history in your Profile settings."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Support Line",
      description: "Call us anytime for immediate assistance",
      action: "1-800-HEALTH-SUPPORT",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "support@healthcare.com",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      action: () => navigate('/chat'),
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
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
              Help & Support Center
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Find answers to common questions and get the support you need. We're here to help you 24/7.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-blue-200">{faq.answer}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
              onClick={typeof method.action === 'function' ? method.action : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                <div className={`${method.color} p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-blue-200 mb-4">{method.description}</p>
                <p className="text-white font-medium">
                  {typeof method.action === 'string' ? method.action : 'Click to start'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport; 