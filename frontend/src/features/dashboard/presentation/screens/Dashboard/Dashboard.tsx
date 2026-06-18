import React, { useState } from 'react';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import Sidebar from '../../../../../core/presentation/components/Sidebar/Sidebar';
import MapMarker from '../../../../../features/tracking/presentation/components/MapMarker/MapMarker';
import AlertsPanel from '../../../../../core/presentation/components/AlertsPanel/AlertsPanel';
import UnifiedModal from '../../../../../core/presentation/components/Modals/UnifiedModal';
import MapViewport from '../../../../../features/geofencing/presentation/components/GeoFencing/MapViewport';
import { ModalAlertData } from '../../../../../core/presentation/components/Modals/UnifiedModal';
import { NotificationData } from '../../../../../core/presentation/components/AlertsPanel/NotificationItem';
import { PATROL_POSITIONS, PATROL_LIVE_STATUS } from '../../../../../features/tracking/data/patrolPositions';
import { AxiosIncidentsRepository } from '../../../../../features/incidents/data/repositories/axiosIncidentsRepository';
import { IncidentsUseCase } from '../../../../../features/incidents/domain/useCases/ejemploIncidentsUseCase';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<ModalAlertData | null>(null);
  const router = useIonRouter();

  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  React.useEffect(() => {
    let intervalId: any;

    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('sigep_token') || '';
        const repo = new AxiosIncidentsRepository();
        const useCase = new IncidentsUseCase(repo);
        const data = await useCase.executeGetIncidents(token);
        
        // Mapear los incidentes a NotificationData
        const mapped: NotificationData[] = data.map(inc => {
          const isPanic = inc.tipo_incidente?.toLowerCase().includes('panico') || inc.tipo_incidente?.toLowerCase().includes('pánico');
          return {
            id: inc.id.toString(),
            title: isPanic ? 'Alerta de Pánico' : inc.tipo_incidente,
            subtitle: inc.descripcion || 'Sin descripción',
            time: new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: isPanic ? 'panic' : 'incident',
            incidentNumber: inc.id,
            read: false,
            // Guardamos la info original para el modal
            rawIncident: inc
          };
        });

        // Añadir algunas geocercas falsas para mantener la UI rica (los vehiculos siguen siendo default)
        mapped.push({
          id: 'g5', title: 'Salida de Geo-cerca', subtitle: 'Patrulla 5 - Límite Calle Uno',
          time: '12:00', type: 'geofence', read: false
        });

        // Ordenamos para que los más recientes (mayor ID o fecha) salgan primero
        mapped.sort((a, b) => b.id > a.id ? 1 : -1);

        setNotifications(mapped);
      } catch (error) {
        console.error("Error cargando notificaciones del dashboard", error);
      }
    };

    fetchIncidents();
    // Refrescar incidentes cada 5 segundos para que los pánicos y nuevos reportes aparezcan en tiempo real
    intervalId = setInterval(fetchIncidents, 5000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Mapa de patrulla ID → notificación correspondiente (mantenemos el default para geocerca)
  const patrolNotificationMap: Record<number, string> = {
    5: 'g5',
  };

  const handleNotificationClick = (notif: NotificationData & { rawIncident?: any }) => {
    let modalData: ModalAlertData = {
      type: notif.type,
      time: notif.time,
      location: 'Ubicación reportada',
      unit: 'Unidad Táctica',
      title: '',
      coords: '',
      primaryAction: '',
    };

    if (notif.rawIncident) {
      modalData.coords = `${notif.rawIncident.latitud}, ${notif.rawIncident.longitud}`;
    }

    if (notif.type === 'panic') {
      modalData = {
        ...modalData,
        title: 'EMERGENCIA: BOTÓN DE PÁNICO ACTIVADO',
        statusLabel: 'Estado',
        statusValue: 'Crítico',
        primaryAction: 'DESPACHAR APOYO INMEDIATO',
      };
    } else if (notif.type === 'incident') {
      modalData = {
        ...modalData,
        title: `INCIDENTE: ${notif.title.toUpperCase()}`,
        gravity: notif.rawIncident?.nivel_gravedad || 'MEDIA',
        primaryAction: 'VER DETALLES',
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
                    {PATROL_POSITIONS.map((patrol: any) => (
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
            onSecondaryAction={() => {
              setIsModalOpen(false);
              router.push('/incidents', 'forward', 'push');
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

