import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import ActionButton from '../Buttons/ActionButton';
import './UnifiedModal.scss';

export type AlertType = 'panic' | 'incident' | 'geofence';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    type: AlertType;
    title: string;
    unit: string;
    location: string;
    coords: string;
    statusLabel?: string;
    statusValue?: string;
    gravity?: string;
    officers?: string;
    time: string;
    evidence?: string;
    primaryAction: string;
    secondaryAction?: string;
  } | null;
}

const UnifiedModal: React.FC<UnifiedModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const getHeaderColor = () => {
    switch (data.type) {
      case 'panic': return '#ffd4d4';
      case 'incident': return '#dcd4ff';
      case 'geofence': return '#ffebae';
      default: return '#eee';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ backgroundColor: getHeaderColor() }}>
          <h2 className="header-title">{data.title}</h2>
          <button className="close-btn" onClick={onClose}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <div className="info-row">
              <span className="label">{data.type === 'incident' ? 'Tipo de Incidente:' : 'Unidad:'}</span>
              <span className="value">{data.type === 'incident' ? data.title.replace('DETALLE DE ', '') : data.unit}</span>
            </div>

            {data.gravity && (
              <div className="info-row">
                <span className="label">Nivel de Gravedad:</span>
                <span className="value">{data.gravity}</span>
              </div>
            )}

            <div className="info-row">
              <span className="label">Ubicación:</span>
              <span className="value">{data.location}</span>
            </div>

            <div className="info-row">
              <span className="label">Coordenadas GPS:</span>
              <span className="value">{data.coords}</span>
            </div>

            {data.statusLabel && (
              <div className="info-row">
                <span className="label">{data.statusLabel}:</span>
                <span className="value">{data.statusValue}</span>
              </div>
            )}

            {data.officers && (
              <div className="info-row">
                <span className="label">Oficiales Abordo:</span>
                <span className="value officers">{data.officers}</span>
              </div>
            )}

            {data.type === 'incident' && (
              <div className="evidence-section">
                <span className="label">Evidencia:</span>
                <div className="evidence-placeholder">
                  <div className="no-image">
                    <img src="/assets/no_image.png" alt="No Evidence" />
                    <p>No Image Available</p>
                  </div>
                </div>
              </div>
            )}

            <div className="info-row time-row">
              <span className="label">Tiempo de activación:</span>
              <span className="value">{data.time}</span>
            </div>
          </div>

          <div className="modal-actions">
            <ActionButton 
              text={data.primaryAction} 
              color={data.type === 'incident' ? 'green' : 'red'} 
              onClick={onClose}
            />
            <ActionButton 
              text={data.secondaryAction || 'GESTIONAR CASO'} 
              color="blue" 
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedModal;
