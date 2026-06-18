import React from 'react';
import { createPortal } from 'react-dom';
import { IonIcon } from '@ionic/react';
import { closeOutline, person } from 'ionicons/icons';
import { useAuth } from '../../../../features/auth/domain/AuthContext';
import './UserProfileModal.scss';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  if (!isOpen) return null;

  return createPortal(
    <div className="user-profile-overlay" onClick={onClose}>
      <div className="user-profile-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <IonIcon icon={closeOutline} />
        </button>

        <h2 className="modal-section-title">Información personal</h2>

        <div className="modal-body">
          <div className="profile-image-container">
            <div className="placeholder-avatar">
              <IonIcon icon={person} />
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Nombre</label>
              <p>{user?.nombre_completo || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Correo Electrónico</label>
              <p className="email">{user?.correo || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Región</label>
              <p>{user?.region || 'No especificada'}</p>
            </div>
            <div className="info-item">
              <label>RUT</label>
              <p>{user?.rut || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Número de teléfono</label>
              <p>{user?.telefono || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Comuna</label>
              <p>{user?.comuna || 'No especificada'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserProfileModal;
