import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

/**
 * PublicRoute — Ruta exclusiva para usuarios NO autenticados.
 * Si el usuario YA tiene sesión activa, redirige a /dashboard
 * para evitar volver al login una vez autenticado.
 * Si NO tiene sesión, renderiza el componente normalmente (Login, Register, etc.)
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated
          ? <Redirect to="/dashboard" />
          : <Component />
      }
    />
  );
};

export default PublicRoute;
