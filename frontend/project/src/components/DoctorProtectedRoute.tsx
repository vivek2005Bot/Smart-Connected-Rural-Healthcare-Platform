import { Navigate } from 'react-router-dom';

interface DoctorProtectedRouteProps {
  children: React.ReactNode;
}

export default function DoctorProtectedRoute({ children }: DoctorProtectedRouteProps) {
  const doctorInfo = localStorage.getItem('doctorInfo');

  if (!doctorInfo) {
    return <Navigate to="/doctor-login" replace />;
  }

  return <>{children}</>;
} 