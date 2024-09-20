import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import RegisterStudent from './components/RegisterStudent';
import StudentDetails from './components/StudentDetails';
import MessAttendance from './components/MessAttendance';
import MarkAttendance from './components/MarkAttendance';

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

// Protected Route component
const ProtectedRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/register-student" element={<ProtectedRoute element={RegisterStudent} />} />
        <Route path="/student-details" element={<ProtectedRoute element={StudentDetails} />} />
        <Route path="/mess-attendance" element={<ProtectedRoute element={MessAttendance} />} />
        <Route path="/mess-attendance/mark" element={<ProtectedRoute element={MarkAttendance} />} />
        {/* Add additional routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
