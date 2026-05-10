import React, { useState } from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { personOutline, logOutOutline } from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import UserProfileModal from '../Modals/UserProfileModal';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const router = useIonRouter();
  const { pathname } = useLocation(); // Reactivo con IonReactRouter
  const { logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { label: 'Monitoreo en Vivo', path: '/dashboard' },
    { label: 'Geo-cercas', path: '/geofencing' },
    { label: 'Historial de Rutas', path: '/history' },
    { label: 'Gestión de Incidentes', path: '/incidents' },
  ];

  const handleLogout = () => {
    logout(); // Limpia la sesión del localStorage
    router.push('/login', 'back', 'push');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src="/assets/logo_municipalidad.png" alt="Logo Municipalidad" className="muni-logo" />
        <div className="title-group">
          <h1 className="sigep-title">SIGEP</h1>
          <p className="sigep-subtitle">Central de Operaciones</p>
        </div>
      </div>

      <div className="divider" />

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`nav-button ${pathname === item.path ? 'active' : ''}`}
            onClick={() => router.push(item.path, 'forward', 'push')}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="footer-button profile"
          onClick={() => setIsProfileOpen(true)}
        >
          <IonIcon icon={personOutline} />
          Perfil de Usuario
        </button>
        <button className="footer-button logout" onClick={handleLogout}>
          <IonIcon icon={logOutOutline} />
          Cerrar Sesión
        </button>
      </div>

      <UserProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
};

export default Sidebar;
