import { useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  patientName?: string;
  patientId?: string;
}

type UserRole = 'doctor' | 'patient';

export default function Appointments() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-04-15',
      time: '10:00 AM',
      status: 'scheduled',
      patientName: 'John Doe',
      patientId: 'P001'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      date: '2024-04-16',
      time: '02:30 PM',
      status: 'scheduled',
      patientName: 'Jane Smith',
      patientId: 'P002'
    }
  ]);

  const handleBookAppointment = () => {
    if (newAppointment.doctor && newAppointment.specialty && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        status: 'scheduled',
        patientName: 'Current User',
        patientId: 'P003'
      };
      setAppointments([...appointments, appointment]);
      setShowBookingForm(false);
      setNewAppointment({ doctor: '', specialty: '', date: '', time: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {userRole === 'doctor' ? 'Appointment Dashboard' : 'Your Appointments'}
          </h1>
          <p className="text-indigo-200 mb-6">
            {userRole === 'doctor' 
              ? 'View and manage all patient appointments' 
              : 'Manage and schedule your healthcare appointments'}
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setUserRole('patient')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                userRole === 'patient'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-indigo-200 hover:bg-white/20'
              }`}
            >
              Patient View
            </button>
            <button
              onClick={() => setUserRole('doctor')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                userRole === 'doctor'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-indigo-200 hover:bg-white/20'
              }`}
            >
              Doctor View
            </button>
          </div>
        </motion.div>

        {userRole === 'patient' && !showBookingForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book New Appointment
            </button>
          </motion.div>
        )}

        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Book New Appointment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Doctor's Name"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Specialty"
                value={newAppointment.specialty}
                onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowBookingForm(false)}
                className="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{appointment.doctor}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'scheduled' ? 'bg-green-500/20 text-green-300' :
                  appointment.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <p className="text-indigo-200 mb-2">{appointment.specialty}</p>
              {userRole === 'doctor' && (
                <div className="mb-4">
                  <p className="text-indigo-200">Patient: {appointment.patientName}</p>
                  <p className="text-indigo-200 text-sm">ID: {appointment.patientId}</p>
                </div>
              )}
              <div className="flex items-center space-x-4 text-indigo-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {appointment.time}
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                {userRole === 'patient' && (
                  <>
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Reschedule
                    </button>
                    <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 px-4 py-2 rounded-lg transition-colors">
                      Cancel
                    </button>
                  </>
                )}
                {userRole === 'doctor' && (
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}