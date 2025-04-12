import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ServiceCard from './components/ServiceCard.tsx';
import Appointments from './pages/Appointments.tsx';
import ChatSupport from './pages/ChatSupport.tsx';
import MentalHealth from './pages/MentalHealth.tsx';
import HelpSupport from './pages/HelpSupport.tsx';
import Emergency from './pages/Emergency.tsx';
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
import PredictPage from './pages/PredictPage';
import { LanguageProvider } from './context/LanguageContext';

const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/predict" element={<PredictPage onBack={() => window.history.back()} onLogout={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/';
          }} />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/help" element={<HelpSupport />} />

          {/* Protected routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorProtectedRoute>
                <DoctorDashboard />
              </DoctorProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
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

          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatBot />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;