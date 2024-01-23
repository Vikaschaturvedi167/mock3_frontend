
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from '../components/Signup.Form';
import Login from '../components/LoginForm';
import Dashboard from '../components/Dashboard';

const PrivateRoute = ({ element }) => {
  return localStorage.getItem('token') ? (
    element
  ) : (
    <Navigate to="/signup" replace />
  );
};

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard /> }
        />
        <Route path="/*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
