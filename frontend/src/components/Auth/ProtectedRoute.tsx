import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

/**
 * ProtectedRoute — Ruta protegida por autenticación.
 * Si el usuario NO tiene sesión activa, redirige a /login.
 * Si SÍ tiene sesión, renderiza el componente normalmente.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated
          ? <Component />
          : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
