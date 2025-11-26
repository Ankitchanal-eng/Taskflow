import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import PrivateRoute if you use one

function App() {
  return (
    <Routes>
      {/* 👇 Default: open /register when someone hits the root URL */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
