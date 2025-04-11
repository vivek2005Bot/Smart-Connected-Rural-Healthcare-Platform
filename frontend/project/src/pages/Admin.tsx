import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  symptoms: string;
  contactNumber: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated doctor data - In real app, this would come from authentication
  const doctorInfo = {
    name: "Dr. Smith",
    specialization: "General Physician",
    id: "DOC123"
  };

  useEffect(() => {
    // Simulate fetching appointments from backend
    const fetchAppointments = async () => {
      // In real app, this would be an API call
      const mockAppointments: Appointment[] = [
        {
          id: "APT001",
          patientName: "John Doe",
          date: "2024-03-20",
          time: "10:00 AM",
          status: "pending",
          symptoms: "Fever and headache",
          contactNumber: "+1234567890"
        },
        {
          id: "APT002",
          patientName: "Jane Smith",
          date: "2024-03-20",
          time: "11:30 AM",
          status: "confirmed",
          symptoms: "Regular checkup",
          contactNumber: "+1234567891"
        },
        {
          id: "APT003",
          patientName: "Mike Johnson",
          date: "2024-03-21",
          time: "09:00 AM",
          status: "cancelled",
          symptoms: "Chronic back pain",
          contactNumber: "+1234567892"
        }
      ];

      setAppointments(mockAppointments);
      setIsLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    // In real app, this would be an API call
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl"
        >
          {/* Doctor Info Section */}
          <div className="mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{doctorInfo.name}</h1>
            <p className="text-blue-200">{doctorInfo.specialization} - ID: {doctorInfo.id}</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex space-x-4">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  filter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{appointment.patientName}</h3>
                      <div className="space-y-1 text-blue-200">
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>Symptoms: {appointment.symptoms}</p>
                        <p>Contact: {appointment.contactNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
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
          )}
        </motion.div>
      </main>
    </div>
  );
} 