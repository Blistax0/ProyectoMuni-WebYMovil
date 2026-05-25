import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MapMarker from '../../components/MapMarker/MapMarker';
import AlertsPanel from '../../components/AlertsPanel/AlertsPanel';
import UnifiedModal from '../../components/Modals/UnifiedModal';
import MapViewport from '../../components/GeoFencing/MapViewport';
import { ModalAlertData } from '../../components/Modals/UnifiedModal';
import { NotificationData } from '../../components/AlertsPanel/NotificationItem';
import { PATROL_POSITIONS, PATROL_LIVE_STATUS } from '../../data/patrolPositions';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<ModalAlertData | null>(null);

  const notifications: NotificationData[] = [
    {
      id: 'p2',
      title: 'Alerta de Pánico',
      subtitle: 'Patrulla 2 - Avenida Arturo Phillips',
      time: '1m',
      type: 'panic',
      read: false
    },
    {
      id: 'p1',
      title: 'Alerta de Pánico',
      subtitle: 'Patrulla 1 - Calle Las Violetas',
      time: '2m',
      type: 'panic',
      read: false
    },
    {
      id: 'i3',
      title: 'Incidente Reportado',
      subtitle: 'Asalto - Marbella',
      time: '3m',
      type: 'incident',
      incidentNumber: 3,
      read: false
    },
    {
      id: 'g5',
      title: 'Salida de Geo-cerca',
      subtitle: 'Patrulla 5 - Límite Calle Uno',
      time: '7m',
      type: 'geofence',
      read: false
    },
    {
      id: 'i2',
      title: 'Incidente Reportado',
      subtitle: 'Grupo Sospechoso - Las Violetas',
      time: '10m',
      type: 'incident',
      incidentNumber: 2,
      read: false
    },
    {
      id: 'i1',
      title: 'Incidente Reportado',
      subtitle: 'Consumo de Alcohol - Plaza de las Flores',
      time: '15m',
      type: 'incident',
      incidentNumber: 1,
      read: false
    }
  ];

  // Mapa de patrulla ID → notificación correspondiente
  const patrolNotificationMap: Record<number, string> = {
    1: 'p1',
    2: 'p2',
    5: 'g5',
  };

  const handleNotificationClick = (notif: NotificationData) => {
    let modalData: ModalAlertData = {
      type: notif.type,
      time: `Hace ${notif.time}`,
      location: notif.subtitle.split(' - ')[1] + ', Santo Domingo, Valparaíso',
      unit: notif.subtitle.split(' - ')[0],
      title: '',
      coords: '',
      primaryAction: '',
    };

    if (notif.type === 'panic') {
      modalData = {
        ...modalData,
        title: 'EMERGENCIA: BOTÓN DE PÁNICO ACTIVADO',
        coords: notif.id === 'p1' ? '-33.645268, -71.630794' : '-33.630712, -71.623918',
        statusLabel: 'Estado del Vehículo',
        statusValue: notif.id === 'p1' ? 'En movimiento (20 km/h)' : 'Detenido (0 km/h)',
        officers: notif.id === 'p1' ? 'Sebastián Soto - Pablo Rojas' : 'Juan Pérez - Diego Soto',
        primaryAction: 'DESPACHAR APOYO INMEDIATO',
      };
    } else if (notif.type === 'incident') {
      const isGrave = notif.incidentNumber === 3;
      const isMedia = notif.incidentNumber === 2;
      modalData = {
        ...modalData,
        title: 'DETALLE DE INCIDENTE REPORTADO',
        gravity: isGrave ? 'ALTA' : (isMedia ? 'MEDIA' : 'BAJA'),
        coords: isGrave ? '-33.636308, -71.631518' : (isMedia ? '-33.645471, -71.630812' : '-33.640424, -71.629345'),
        primaryAction: isGrave ? 'DERIVAR A CARABINEROS' : (isMedia ? 'ENVIAR PATRULLA PREVENTIVA' : 'ENVIAR INSPECTORES MUNICIPALES'),
      };
    } else if (notif.type === 'geofence') {
      modalData = {
        ...modalData,
        title: 'ALERTA OPERATIVA: SALIDA DE GEO-CERCA',
        coords: '-33.640000, -71.635000',
        statusLabel: 'Velocidad Actual',
        statusValue: '45 km/h',
        primaryAction: 'CONTACTAR UNIDAD POR RADIO',
      };
    }

    setSelectedAlert(modalData);
    setIsModalOpen(true);
  };

  const handleMarkerClick = (patrolId: number) => {
    const notifId = patrolNotificationMap[patrolId];
    if (!notifId) return; // Patrullas sin alerta activa no abren modal
    const notif = notifications.find(n => n.id === notifId);
    if (notif) handleNotificationClick(notif);
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="dashboard-page">
          <Sidebar />
          
          <main className="map-view">
            <div className="map-viewport-wrapper">
              <MapViewport 
                imageSrc="/assets/mapa_santodomingo.png" 
                isDrawingMode={false}
                markers={
                  <>
                    {PATROL_POSITIONS.map((patrol) => (
                      <MapMarker 
                        key={patrol.id}
                        id={patrol.id}
                        type={PATROL_LIVE_STATUS[patrol.id]}
                        top={patrol.top}
                        left={patrol.left}
                        onClick={() => handleMarkerClick(patrol.id)}
                      />
                    ))}
                  </>
                }
              />
            </div>

            <AlertsPanel 
              notifications={notifications} 
              onNotificationClick={handleNotificationClick}
            />
          </main>

          <UnifiedModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={selectedAlert}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

