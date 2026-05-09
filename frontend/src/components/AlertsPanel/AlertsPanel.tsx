import React from 'react';
import NotificationItem, { NotificationData } from './NotificationItem';
import './AlertsPanel.scss';

interface AlertsPanelProps {
  notifications: NotificationData[];
  onNotificationClick: (notification: NotificationData) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ notifications, onNotificationClick }) => {
  return (
    <div className="alerts-panel-container">
      <h2 className="panel-title">Alertas y Casos Activos</h2>
      <div className="notifications-list">
        {notifications.map((notif) => (
          <NotificationItem 
            key={notif.id} 
            data={notif} 
            onClick={() => onNotificationClick(notif)} 
          />
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
