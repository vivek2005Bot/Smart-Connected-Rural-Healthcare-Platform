import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string | number;
  patientName?: string;
  name?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  symptoms?: string;
  contactNumber?: string;
  contact?: string;
  email?: string;
  address?: string;
  doctor?: string;
  specialty?: string;
  age?: string;
}

interface DoctorInfo {
  id: string;
  name: string;
  specialization: string;
}

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  todayAppointments: number;
}

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    todayAppointments: 0
  });

  useEffect(() => {
    // Check authentication
    const storedDoctorInfo = localStorage.getItem('doctorInfo');
    if (!storedDoctorInfo) {
      navigate('/doctor-login');
      return;
    }
    setDoctorInfo(JSON.parse(storedDoctorInfo));

    // Fetch appointments
    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    // Calculate stats whenever appointments change
    const newStats = {
      total: appointments.length,
      pending: appointments.filter(apt => apt.status === 'pending').length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
      todayAppointments: appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length
    };
    setStats(newStats);
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      // Get appointments from localStorage
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Transform stored appointments to match our interface
      const transformedAppointments: Appointment[] = storedAppointments.map((apt: any) => ({
        id: apt.id,
        patientName: apt.name || 'Unknown Patient',
        date: new Date(apt.date).toLocaleDateString(),
        time: apt.time || new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: apt.status || 'pending',
        symptoms: apt.symptoms || 'Not specified',
        contactNumber: apt.contact || apt.contactNumber,
        email: apt.email,
        address: apt.address,
        doctor: apt.doctor,
        specialty: apt.specialty,
        age: apt.age
      }));

      setAppointments(transformedAppointments);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setIsLoading(false);
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      // Get current appointments from localStorage
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Find and update the appointment status
      const updatedAppointments = appointments.map((apt: any) => {
        if (apt.id.toString() === appointmentId) {
          return {
            ...apt,
            status: newStatus
          };
        }
        return apt;
      });

      // Save back to localStorage
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      // Update state to reflect changes
      setAppointments(prevAppointments => 
        prevAppointments.map(apt => 
          apt.id.toString() === appointmentId 
            ? { ...apt, status: newStatus }
            : apt
        )
      );

      // Show success message
      alert(`Appointment ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorInfo');
    navigate('/doctor-login');
  };

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' ? true : apt.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'pending': return 'from-yellow-500 to-yellow-600';
      case 'confirmed': return 'from-green-500 to-green-600';
      case 'cancelled': return 'from-red-500 to-red-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  if (!doctorInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Doctor Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{doctorInfo.name}</h2>
                <p className="text-blue-200 text-sm">{doctorInfo.specialization}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Notifications</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Appointments</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.total}</h3>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Pending</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.pending}</h3>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Confirmed</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.confirmed}</h3>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Today's Appointments</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.todayAppointments}</h3>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl"
        >
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Appointments</h1>
              <p className="text-blue-200">Manage your patient appointments and schedules</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Appointment</span>
              </button>
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex space-x-4">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-xl capitalize font-medium transition-all shadow-lg ${
                  filter === status 
                    ? `bg-gradient-to-r ${getStatusGradient(status)} text-white` 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {status}
              </motion.button>
            ))}
          </div>

          {/* Appointments List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-white/5 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No appointments found</h3>
                  <p className="text-blue-200">No appointments match your current filter.</p>
                </motion.div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{appointment.patientName || appointment.name}</h3>
                        <div className="space-y-1 text-blue-200">
                          <p>Date: {appointment.date}</p>
                          <p>Time: {appointment.time}</p>
                          {appointment.symptoms && <p>Symptoms: {appointment.symptoms}</p>}
                          {appointment.contactNumber && <p>Contact: {appointment.contactNumber}</p>}
                          {appointment.email && <p>Email: {appointment.email}</p>}
                          {appointment.age && <p>Age: {appointment.age}</p>}
                          {appointment.address && <p>Address: {appointment.address}</p>}
                          {appointment.specialty && <p>Specialty: {appointment.specialty}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        {appointment.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusChange(appointment.id.toString(), 'confirmed')}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id.toString(), 'cancelled')}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
} 