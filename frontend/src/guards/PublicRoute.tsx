import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute — Ruta exclusiva para usuarios NO autenticados.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
