// RoleRoute.js
// RoleRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProviderContext';

const RoleRoute = ({ element, allowedRoles, ...rest }) => {
  const { role } = useAuth();

  // If the user's role is in the allowedRoles list, render the element
  const renderElement = allowedRoles.includes(role) ? element : <Navigate to="/" replace />;

  return <Route {...rest} element={renderElement} />;
};

export default RoleRoute;