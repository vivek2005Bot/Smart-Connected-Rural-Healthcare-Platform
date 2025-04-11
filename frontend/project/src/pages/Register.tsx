import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', name: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '', name: '' };
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Registration logic will be implemented here
      console.log('Registration attempt:', { email, password, name });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 floating">
          <h1 className="text-4xl font-bold text-white mb-4">Create Account</h1>
          <p className="text-xl text-white/70">Join our healthcare platform today</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="glass-card backdrop-blur-md bg-blue-900/40 border border-blue-700/50 rounded-2xl shadow-lg overflow-hidden
            transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 
                flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <UserPlus className="w-8 h-8 text-white" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-blue-800/30 border border-blue-600/50 rounded-xl text-white 
                        placeholder-blue-300/50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none
                        transform transition-transform duration-200 hover:scale-[1.01] ${
                          errors.name ? 'border-red-400' : ''
                        }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-blue-800/30 border border-blue-600/50 rounded-xl text-white 
                        placeholder-blue-300/50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none
                        transform transition-transform duration-200 hover:scale-[1.01] ${
                          errors.email ? 'border-red-400' : ''
                        }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-lg font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-blue-800/30 border border-blue-600/50 rounded-xl text-white 
                        placeholder-blue-300/50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none
                        transform transition-transform duration-200 hover:scale-[1.01] ${
                          errors.password ? 'border-red-400' : ''
                        }`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl
                    hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 hover:-rotate-1
                    transition-all duration-200 shadow-lg hover:shadow-blue-500/20 text-lg font-semibold"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/70">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}