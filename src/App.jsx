import {  Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Apis from './pages/Apis';
import Users from './pages/Users';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Help from './pages/Help';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apis" element={<Apis />} />
        <Route path="/users" element={<Users />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/security" element={<Security />} />
        <Route path="/help" element={<Help />} />
      </Routes>
  );
}
