import React from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { personOutline, logOutOutline } from 'ionicons/icons';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const router = useIonRouter();
  const currentPath = window.location.pathname;

  const menuItems = [
    { label: 'Monitoreo en Vivo', path: '/dashboard', active: true },
    { label: 'Geo-cercas', path: '/geofencing', active: false },
    { label: 'Historial de Rutas', path: '/history', active: false },
    { label: 'Gestión de Incidentes', path: '/incidents', active: false },
  ];

  const handleLogout = () => {
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
            className={`nav-button ${currentPath === item.path || item.active ? 'active' : ''}`}
            onClick={() => router.push(item.path, 'forward', 'push')}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="footer-button profile">
          <IonIcon icon={personOutline} />
          Perfil de Usuario
        </button>
        <button className="footer-button logout" onClick={handleLogout}>
          <IonIcon icon={logOutOutline} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
