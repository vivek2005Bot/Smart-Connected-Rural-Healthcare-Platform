import React, { useState, useEffect } from 'react';
import PublicHeader from '../components/PublicHeader';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string | number;
  name?: string;
  date: string;
  time?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  symptoms?: string;
  contact?: string;
  email?: string;
  address?: string;
  age?: string;
  doctor?: string;
  specialty?: string;
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

export default function Appointments() {
  const navigate = useNavigate();
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
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [availableDoctors] = useState([
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
    { name: 'Dr. Emily Brown', specialty: 'General Medicine' },
    { name: 'Dr. David Wilson', specialty: 'Orthopedics' }
  ]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      setAppointments(storedAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
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
        name,
        age,
        email,
        contact,
        address
      };

      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updatedAppointments = [...existingAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

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

      loadAppointments();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (appointmentId: string | number, newStatus: 'confirmed' | 'cancelled') => {
    try {
      // Get current appointments from localStorage
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Update the appointment status
      const updatedAppointments = storedAppointments.map((apt: Appointment) => {
        if (apt.id.toString() === appointmentId.toString()) {
          return {
            ...apt,
            status: newStatus
          };
        }
        return apt;
      });

      // Save back to localStorage
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      // Update state
      setAppointments(updatedAppointments);

      // Show success message
      alert(`Appointment ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status');
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <PublicHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Book an Appointment</h1>
          <p className="text-indigo-200 mb-6">Schedule your healthcare appointment with our experienced doctors</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingForm(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Book New Appointment
          </motion.button>
        </motion.div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Book Appointment</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={bookingFormData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={bookingFormData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={bookingFormData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={bookingFormData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={bookingFormData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                <select
                  name="doctor"
                  value={bookingFormData.doctor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="">Select Doctor</option>
                  {availableDoctors.map((doctor, index) => (
                    <option key={index} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="date"
                  value={bookingFormData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <input
                  type="time"
                  name="time"
                  value={bookingFormData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBookAppointment}
                    className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Appointments List */}
        {appointments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Appointments</h2>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Your Appointments</h1>
                <p className="text-purple-200">Manage your patient appointments and schedules</p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <span className="text-xl">+</span> Add Appointment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-800 transition-colors"
                >
                  Sort
                </motion.button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-6 py-2 rounded-lg ${
                  filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-6 py-2 rounded-lg ${
                  filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-6 py-2 rounded-lg ${
                  filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                Cancelled
              </button>
            </div>

            <div className="space-y-6">
              {filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{appointment.name}</h3>
                      <div className="space-y-1 text-purple-200">
                        <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                        {appointment.time && <p>Time: {appointment.time}</p>}
                        {appointment.symptoms && <p>Symptoms: {appointment.symptoms}</p>}
                        {appointment.contact && <p>Contact: {appointment.contact}</p>}
                        {appointment.email && <p>Email: {appointment.email}</p>}
                        {appointment.age && <p>Age: {appointment.age}</p>}
                        {appointment.address && <p>Address: {appointment.address}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'pending' ? 'bg-yellow-500' :
                        appointment.status === 'confirmed' ? 'bg-green-500' :
                        'bg-red-500'
                      }`}>
                        {appointment.status}
                      </span>
                      {appointment.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-sm"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}