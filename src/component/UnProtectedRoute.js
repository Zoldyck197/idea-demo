import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !localStorage.getItem('authToken');
  
  return isAuthenticated ? element : <Navigate to='/' />;
};

export default ProtectedRoute;
