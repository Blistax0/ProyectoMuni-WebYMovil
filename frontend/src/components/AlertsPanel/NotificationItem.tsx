import React from 'react';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, triangleOutline, alertCircleOutline } from 'ionicons/icons';
import './NotificationItem.scss';

export interface NotificationData {
  id: string | number;
  title: string;
  subtitle: string;
  time: string;
  type: 'panic' | 'incident' | 'geofence';
  incidentNumber?: number;
  read?: boolean;
}

interface NotificationItemProps {
  data: NotificationData;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data, onClick }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'panic': return alertCircleOutline;
      case 'incident': return triangleOutline;
      case 'geofence': return notificationsOutline;
      default: return notificationsOutline;
    }
  };

  const getIconColor = () => {
    switch (data.type) {
      case 'panic': return '#c34646';
      case 'incident': return '#4200ff';
      case 'geofence': return '#e69d00';
      default: return '#000';
    }
  };

  return (
    <div 
      className={`notification-item ${data.read ? 'read' : ''} type-${data.type}`} 
      onClick={onClick}
    >
      <div className="icon-wrapper" style={{ color: getIconColor() }}>
        <IonIcon icon={getIcon()} className="main-icon" />
        {data.type === 'incident' && data.incidentNumber && (
          <span className="incident-badge">{data.incidentNumber}</span>
        )}
      </div>
      <div className="content">
        <div className="header">
          <span className="title">{data.title}</span>
          <span className="time">Hace {data.time}</span>
        </div>
        <p className="subtitle">{data.subtitle}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
