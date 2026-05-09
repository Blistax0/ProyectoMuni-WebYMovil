import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline, person } from 'ionicons/icons';
import './UserProfileModal.scss';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
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
              <p>Pepe López Ramírez</p>
            </div>
            <div className="info-item">
              <label>Correo Electrónico</label>
              <p className="email">pepito@gmail.com</p>
            </div>
            <div className="info-item">
              <label>Región</label>
              <p>Valparaíso</p>
            </div>
            <div className="info-item">
              <label>RUT</label>
              <p>21.627.416-7</p>
            </div>
            <div className="info-item">
              <label>Número de teléfono</label>
              <p>+56 9 62930162</p>
            </div>
            <div className="info-item">
              <label>Comuna</label>
              <p>Santo Domingo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
