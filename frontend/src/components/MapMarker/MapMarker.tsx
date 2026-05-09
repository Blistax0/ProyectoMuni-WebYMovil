import React from 'react';
import { IonIcon } from '@ionic/react';
import { carOutline } from 'ionicons/icons';
import './MapMarker.scss';

export type MarkerType = 'normal' | 'emergency' | 'alert' | 'selectable' | 'active';

interface MapMarkerProps {
  id: string | number;
  type: MarkerType;
  top: string | number;
  left: string | number;
  onClick?: () => void;
  className?: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ id, type, top, left, onClick, className }) => {
  return (
    <div 
      className={`map-marker-container ${type} ${className || ''}`} 
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
