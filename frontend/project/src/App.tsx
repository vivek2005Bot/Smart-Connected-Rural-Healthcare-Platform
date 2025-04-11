import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, MessageSquare, Brain, HelpCircle, PhoneCall } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import Appointments from './pages/Appointments';
import ChatSupport from './pages/ChatSupport';
import MentalHealth from './pages/MentalHealth';
import HelpSupport from './pages/HelpSupport';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorProtectedRoute from './components/DoctorProtectedRoute';
import HomePage from './pages/Home';
import LandingPage from './pages/LandingPage';
import ChatBot from './components/ChatBot';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/home" element={<HomePage />} />

          {/* Doctor routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorProtectedRoute>
                <DoctorDashboard />
              </DoctorProtectedRoute>
            }
          />

          {/* Patient routes */}
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute>
                <Emergency />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatSupport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mental-health"
            element={
              <ProtectedRoute>
                <MentalHealth />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpSupport />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatBot />
      </AuthProvider>
    </Router>
  );
}

export default App;