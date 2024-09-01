// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'student' && window.location.pathname === '/') {
    return <Navigate to={`/class/${user.classId}`} replace />;
  }

  return children;
};

export default PrivateRoute;