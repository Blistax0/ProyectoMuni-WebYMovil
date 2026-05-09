import React from 'react';
import { IonIcon } from '@ionic/react';
import { carOutline } from 'ionicons/icons';
import './MapMarker.scss';

export type MarkerType = 'normal' | 'emergency' | 'alert';

interface MapMarkerProps {
  id: string | number;
  type: MarkerType;
  top: string | number;
  left: string | number;
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ id, type, top, left, onClick }) => {
  return (
    <div 
      className={`map-marker-container ${type}`} 
      style={{ top, left }}
      onClick={onClick}
    >
      <span className="marker-id">{id}</span>
      <div className="icon-box">
        <IonIcon icon={carOutline} />
      </div>
    </div>
  );
};

export default MapMarker;
