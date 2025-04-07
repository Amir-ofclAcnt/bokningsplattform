import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/unauthorized" replace />;

  try {
    const decoded = jwtDecode(token);
    if (role && decoded.role !== role) return <Navigate to="/unauthorized" replace />;
    return children;
  } catch {
    return <Navigate to="/unauthorized" replace />;
  }
}