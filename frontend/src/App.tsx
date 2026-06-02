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

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Auth */
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';

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

          {/* ── Rutas Públicas (solo accesibles sin sesión) ──────────────── */}
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/reset-password" component={ResetPassword} />

          {/* ── Rutas Protegidas (requieren sesión activa) ────────────────── */}
          <ProtectedRoute exact path="/dashboard" component={Dashboard} allowedRoles={['ADMIN', 'PATRULLERO']} />
          <ProtectedRoute exact path="/geofencing" component={GeoFencingPage} allowedRoles={['ADMIN', 'PATRULLERO']} />
          <ProtectedRoute exact path="/history" component={RouteHistoryPage} allowedRoles={['ADMIN', 'PATRULLERO']} />
          <ProtectedRoute exact path="/incidents" component={IncidentManagementPage} allowedRoles={['ADMIN', 'PATRULLERO']} />

          {/* ── Redirección raíz ─────────────────────────────────────────── */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;
