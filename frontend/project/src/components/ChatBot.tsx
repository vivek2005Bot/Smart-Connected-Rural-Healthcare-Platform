import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: {
    text: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

interface AppointmentInfo {
  name: string;
  age: string;
  email: string;
  contact: string;
  address: string;
}

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<string>('initial');
  const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfo>({
    name: '',
    age: '',
    email: '',
    contact: '',
    address: ''
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const askNextQuestion = (step: string) => {
    let question = '';
    switch (step) {
      case 'name':
        question = "Please enter your full name:";
        break;
      case 'age':
        question = "Please enter your age:";
        break;
      case 'email':
        question = "Please enter your email address:";
        break;
      case 'contact':
        question = "Please enter your contact number:";
        break;
      case 'address':
        question = "Please enter your address:";
        break;
      default:
        break;
    }

    if (question) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: question,
          sender: 'bot',
          timestamp: new Date()
        }]);
      }, 500);
    }
  };

  const validateInput = (step: string, value: string): boolean => {
    switch (step) {
      case 'name':
        return value.length >= 3;
      case 'age':
        return !isNaN(Number(value)) && Number(value) > 0 && Number(value) < 120;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'contact':
        return /^\d{10}$/.test(value);
      case 'address':
        return value.length >= 5;
      default:
        return true;
    }
  };

  const getErrorMessage = (step: string): string => {
    switch (step) {
      case 'name':
        return "Please enter a valid name (at least 3 characters)";
      case 'age':
        return "Please enter a valid age (between 1 and 120)";
      case 'email':
        return "Please enter a valid email address";
      case 'contact':
        return "Please enter a valid 10-digit contact number";
      case 'address':
        return "Please enter a valid address (at least 5 characters)";
      default:
        return "Invalid input";
    }
  };

  const handleAppointmentBooking = () => {
    // Save appointment to localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      id: Date.now(),
      ...appointmentInfo,
      status: 'pending',
      date: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Send confirmation message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: "Great! I've booked your appointment. You can view the details in the appointments section. Redirecting you there now...",
      sender: 'bot',
      timestamp: new Date()
    }]);

    // Redirect to appointments page after delay
    setTimeout(() => {
      navigate('/appointments');
      setIsOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Welcome to Smart Healthcare Assistant! 👋\nHow can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        },
        {
          id: 2,
          text: "Please select one of the following options:",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              text: "1. Online Consultation",
              value: "1",
              icon: <MessageSquare className="w-4 h-4" />
            },
            {
              text: "2. Book Appointment",
              value: "2",
              icon: <Calendar className="w-4 h-4" />
            }
          ]
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionSelect = (value: string) => {
    const userMessage: Message = {
      id: messages.length + 2,
      text: value === "1" ? "1. Online Consultation" : "2. Book Appointment",
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    if (value === "1") {
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 3,
          text: "I'm setting up your online consultation. Here's your Zoom meeting link:",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);

        // Add Zoom meeting link message
        setTimeout(() => {
          const zoomLink: Message = {
            id: messages.length + 4,
            text: "Join Zoom Meeting:\nhttps://zoom.us/j/123456789\nMeeting ID: 123 456 789\nPasscode: healthcare",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, zoomLink]);

          // Add instructions message
          const instructions: Message = {
            id: messages.length + 5,
            text: "Please click the link above to join the meeting. A healthcare professional will be with you shortly. The meeting will be active for the next 24 hours.",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, instructions]);
        }, 1000);
      }, 1000);
    } else {
      setCurrentStep('name');
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 3,
          text: "I'll help you book an appointment. I'll need some information from you.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        askNextQuestion('name');
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      if (currentStep === 'initial') {
        if (inputMessage === "1" || inputMessage === "2") {
          handleOptionSelect(inputMessage);
          setInputMessage('');
          return;
        }
      } else {
        // Handle appointment booking flow
        if (!validateInput(currentStep, inputMessage)) {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
          }, {
            id: prev.length + 2,
            text: getErrorMessage(currentStep),
            sender: 'bot',
            timestamp: new Date()
          }]);
          setInputMessage('');
          return;
        }

        setAppointmentInfo(prev => ({
          ...prev,
          [currentStep]: inputMessage
        }));

        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: inputMessage,
          sender: 'user',
          timestamp: new Date()
        }]);

        const nextStep = (() => {
          switch (currentStep) {
            case 'name': return 'age';
            case 'age': return 'email';
            case 'email': return 'contact';
            case 'contact': return 'address';
            case 'address': return 'complete';
            default: return 'complete';
          }
        })();

        setCurrentStep(nextStep);

        if (nextStep === 'complete') {
          handleAppointmentBooking();
        } else {
          askNextQuestion(nextStep);
        }

        setInputMessage('');
        return;
      }

      const newMessage: Message = {
        id: messages.length + 2,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 3,
          text: "To help you better, please select option 1 for Online Consultation or option 2 for Appointment Booking.",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              text: "1. Online Consultation",
              value: "1",
              icon: <MessageSquare className="w-4 h-4" />
            },
            {
              text: "2. Book Appointment",
              value: "2",
              icon: <Calendar className="w-4 h-4" />
            }
          ]
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getInputPlaceholder = () => {
    switch (currentStep) {
      case 'name':
        return "Enter your full name...";
      case 'age':
        return "Enter your age...";
      case 'email':
        return "Enter your email address...";
      case 'contact':
        return "Enter your contact number...";
      case 'address':
        return "Enter your address...";
      default:
        return "Type 1 for consultation or 2 for appointment...";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-[999]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          position: 'fixed', 
          bottom: '24px', 
          right: '24px',
          zIndex: 999
        }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden z-[998] border border-gray-200"
            style={{ 
              position: 'fixed', 
              bottom: '96px', 
              right: '24px',
              zIndex: 998
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Bot className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-white font-semibold">Smart Healthcare Assistant</h3>
                  <p className="text-blue-200 text-sm">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}>
                        <p className="whitespace-pre-line">{message.text}</p>
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleOptionSelect(option.value)}
                                className="w-full flex items-center space-x-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {option.icon}
                                <span>{option.text}</span>
                              </motion.button>
                            ))}
                          </div>
                        )}
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={getInputPlaceholder()}
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 