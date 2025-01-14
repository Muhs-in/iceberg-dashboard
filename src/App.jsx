import {  Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Apis from './pages/Apis';
import Users from './pages/Users';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Help from './pages/Help';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
      <Routes>
        <Route path="/" index element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/apis" element={<Apis />} />
        <Route path="/users" element={<Users />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/security" element={<Security />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
  );
}
