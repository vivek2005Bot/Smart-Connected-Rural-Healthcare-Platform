import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DoctorLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    doctorId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize default doctor if not exists
  useEffect(() => {
    // First, clear any existing doctor data to ensure fresh start
    localStorage.removeItem('doctors');
    localStorage.removeItem('doctorInfo');
    
    // Create default doctor
    const defaultDoctor = {
      id: 'DOC123',
      name: 'Dr. Smith',
      password: 'doc123',
      specialization: 'General Physician'
    };
    
    // Store in localStorage
    localStorage.setItem('doctors', JSON.stringify([defaultDoctor]));
  }, []); // Run only once on component mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get doctors from localStorage
      const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
      const doctor = doctors.find((d: any) => d.id === credentials.doctorId);
      
      if (!doctor) {
        setError('Doctor ID not found');
        setIsLoading(false);
        return;
      }

      if (credentials.password !== doctor.password) {
        setError('Invalid password');
        setIsLoading(false);
        return;
      }

      // Store doctor info in localStorage
      const doctorInfo = {
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization
      };
      localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));

      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate('/doctor-dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Doctor Login</h1>
          <p className="text-blue-200">Access your appointment dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium text-blue-200 mb-2">
              Doctor ID
            </label>
            <input
              id="doctorId"
              type="text"
              value={credentials.doctorId}
              onChange={(e) => setCredentials({ ...credentials, doctorId: e.target.value.trim() })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your doctor ID"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value.trim() })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
} 