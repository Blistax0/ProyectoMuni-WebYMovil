import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Auth & Guards */
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';

/* Páginas Públicas */
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';

/* Páginas Protegidas */
import Dashboard from './pages/Dashboard/Dashboard';
import GeoFencingPage from './pages/GeoFencing/GeoFencingPage';
import RouteHistoryPage from './pages/RouteHistory/RouteHistoryPage';
import IncidentManagementPage from './pages/IncidentManagement/IncidentManagementPage';

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          {/* Rutas Públicas */}
          <Route exact path="/login">
            <PublicRoute><Login /></PublicRoute>
          </Route>

          <Route exact path="/register">
            <PublicRoute><Register /></PublicRoute>
          </Route>

          <Route exact path="/reset-password">
            <PublicRoute><ResetPassword /></PublicRoute>
          </Route>

          {/* Rutas Protegidas */}
          <Route exact path="/dashboard">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}> {/* De momento lo deje para que puedan verlo ambos por temas de pruebas y saber que funciona bien */}
              <Dashboard />
            </ProtectedRoute>
          </Route>

          <Route exact path="/geofencing">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}> {/* Lo mismo :p, si no lo dejamos solo para admin */}
              <GeoFencingPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/history">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <RouteHistoryPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/incidents">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <IncidentManagementPage />
            </ProtectedRoute>
          </Route>

          {/* Redirección raíz */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;
