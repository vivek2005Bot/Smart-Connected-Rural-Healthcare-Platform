export interface User {
  id: string;
  name: string;
  role: 'patient' | 'doctor';
  email: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface EmergencyRequest {
  id: string;
  patientId: string;
  type: 'call' | 'ambulance';
  status: 'pending' | 'inProgress' | 'completed';
  timestamp: string;
}