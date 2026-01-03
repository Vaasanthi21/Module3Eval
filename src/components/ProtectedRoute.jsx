import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowRole && user.role !== allowRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}
