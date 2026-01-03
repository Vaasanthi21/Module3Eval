import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpdate from './pages/admin/AdminUpdate';
import CustomerDashboard from './pages/customers/CustomerDashboard';
import './styles.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/restaurants/update"
            element={
              <ProtectedRoute allowRole="admin">
                <AdminUpdate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers/dashboard"
            element={
              <ProtectedRoute allowRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div className="container">Not found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
