import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: number;
  doctor?: string;
  specialty?: string;
  date: string;
  time?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  patientName?: string;
  patientId?: string;
  name?: string;
  age?: string;
  email?: string;
  contact?: string;
  address?: string;
}

interface BookingFormData {
  name: string;
  age: string;
  email: string;
  contact: string;
  address: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

type UserRole = 'doctor' | 'patient';

export default function Appointments() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<BookingFormData>({
    name: '',
    age: '',
    email: '',
    contact: '',
    address: '',
    doctor: '',
    specialty: '',
    date: '',
    time: ''
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availableDoctors] = useState([
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
    { name: 'Dr. Emily Brown', specialty: 'General Medicine' },
    { name: 'Dr. David Wilson', specialty: 'Orthopedics' }
  ]);

  // Load appointments from localStorage
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // Get chatbot appointments
    const chatbotAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Get default appointments
    const defaultAppointments: Appointment[] = [
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
    ];

    // Transform chatbot appointments to match the Appointment interface
    const transformedChatbotAppointments = chatbotAppointments.map((apt: any) => ({
      id: apt.id,
      doctor: apt.doctor || 'To be assigned',
      specialty: apt.specialty || 'General',
      date: new Date(apt.date).toLocaleDateString(),
      time: new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: apt.status,
      patientName: apt.name,
      patientId: `P${apt.id.toString().slice(-3)}`,
      email: apt.email,
      contact: apt.contact,
      address: apt.address,
      age: apt.age
    }));

    // Combine both types of appointments
    setAppointments([...defaultAppointments, ...transformedChatbotAppointments]);
  };

  const handleBookAppointment = () => {
    const {
      name, age, email, contact, address, doctor, specialty, date, time
    } = bookingFormData;

    if (name && age && email && contact && address && date && time) {
      const newAppointment: Appointment = {
        id: Date.now(),
        doctor: doctor || 'To be assigned',
        specialty: specialty || 'General',
        date,
        time,
        status: 'pending',
        patientName: name,
        patientId: `P${Date.now().toString().slice(-3)}`,
        name,
        age,
        email,
        contact,
        address
      };

      // Get existing appointments
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Add new appointment
      const updatedAppointments = [...existingAppointments, newAppointment];
      
      // Save to localStorage
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      // Update state
      setAppointments(prev => [...prev, newAppointment]);
      setShowBookingForm(false);
      setBookingFormData({
        name: '',
        age: '',
        email: '',
        contact: '',
        address: '',
        doctor: '',
        specialty: '',
        date: '',
        time: ''
      });

      // Reload appointments to ensure consistency
      loadAppointments();
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
                placeholder="Full Name"
                value={bookingFormData.name}
                onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Age"
                value={bookingFormData.age}
                onChange={(e) => setBookingFormData({ ...bookingFormData, age: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={bookingFormData.email}
                onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                value={bookingFormData.contact}
                onChange={(e) => setBookingFormData({ ...bookingFormData, contact: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={bookingFormData.address}
                onChange={(e) => setBookingFormData({ ...bookingFormData, address: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
              />
              <select
                value={bookingFormData.doctor}
                onChange={(e) => {
                  const doctor = availableDoctors.find(d => d.name === e.target.value);
                  setBookingFormData({
                    ...bookingFormData,
                    doctor: e.target.value,
                    specialty: doctor?.specialty || ''
                  });
                }}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Doctor</option>
                {availableDoctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>{doctor.name} - {doctor.specialty}</option>
                ))}
              </select>
              <input
                type="date"
                value={bookingFormData.date}
                onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                value={bookingFormData.time}
                onChange={(e) => setBookingFormData({ ...bookingFormData, time: e.target.value })}
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
                  appointment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <p className="text-indigo-200 mb-2">{appointment.specialty || 'General Consultation'}</p>
              {(userRole === 'doctor' || appointment.status === 'pending') && (
                <div className="mb-4">
                  <p className="text-indigo-200">Patient: {appointment.patientName}</p>
                  <p className="text-indigo-200 text-sm">ID: {appointment.patientId}</p>
                  {appointment.status === 'pending' && (
                    <>
                      <p className="text-indigo-200 text-sm">Age: {appointment.age}</p>
                      <p className="text-indigo-200 text-sm">Email: {appointment.email}</p>
                      <p className="text-indigo-200 text-sm">Contact: {appointment.contact}</p>
                      <p className="text-indigo-200 text-sm">Address: {appointment.address}</p>
                    </>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-4 text-indigo-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {appointment.date}
                </div>
                {appointment.time && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {appointment.time}
                  </div>
                )}
              </div>
              <div className="mt-6 flex space-x-4">
                {userRole === 'patient' && appointment.status !== 'pending' && (
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
                  <button 
                    onClick={() => {
                      if (appointment.status === 'pending') {
                        const updatedAppointments = appointments.map(apt => 
                          apt.id === appointment.id ? { ...apt, status: 'scheduled' as const } : apt
                        );
                        setAppointments(updatedAppointments);
                        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
                      }
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {appointment.status === 'pending' ? 'Accept Appointment' : 'View Details'}
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