import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Appointments', path: '/appointments' },
  ];

  const services = [
    { name: 'Emergency Care', path: '/emergency' },
    { name: 'Mental Health', path: '/mental-health' },
    { name: 'Online Consultation', path: '/chat' },
    { name: 'Help Center', path: '/help' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Heart size={24} className="text-blue-500 animate-pulse" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                HealthCare
              </h2>
            </div>
            <p className="text-white/60 mb-6">
              Providing quality healthcare services accessible to everyone, anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="service-icon p-2 hover:text-blue-400 text-white/70"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => navigate(service.path)}
                    className="text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/60">
                <MapPin size={18} className="text-blue-400" />
                <span>123 Healthcare Ave, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60">
                <Phone size={18} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60">
                <Mail size={18} className="text-blue-400" />
                <span>contact@healthcare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} HealthCare. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button onClick={() => navigate('/privacy')} className="text-white/60 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => navigate('/terms')} className="text-white/60 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}