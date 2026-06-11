import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../../../../core/presentation/components/Sidebar/Sidebar';
import MapViewport from '../../../../../features/geofencing/presentation/components/GeoFencing/MapViewport';
import MapMarker from '../../../../../features/tracking/presentation/components/MapMarker/MapMarker';
import RouteSummaryPanel from '../../components/RouteHistory/RouteSummaryPanel';
import PlaybackControl from '../../components/RouteHistory/PlaybackControl';
import { PATROL_POSITIONS } from '../../../../../features/tracking/data/patrolPositions';
import './RouteHistoryPage.scss';

const RouteHistoryPage: React.FC = () => {
  const [selectedPatrolId, setSelectedPatrolId] = useState<number | null>(null);

  const patrolData: Record<number, any> = {
    1: {
      patrolName: 'Patrulla 1',
      date: '05/May/2026',
      range: '18:00 - 20:00 hrs',
      distance: '14.5 km',
      avgSpeed: '35 km/h',
      events: ['1 Incidente (Consumo de alcohol)'],
      routePath: "M462 418L429 414.5L390.5 404L352.5 384L325 363.5L298 347.5L261 324L223.5 300.5L193.5 282L177 271.5L174 262.5L177 248.5L183.5 238.5V225L178 216.5L167.5 215.5L150 221L112.5 237L100 244L96 224.5L92 195.5V165.5L94.5 142.5L88 134.5L62.5 125.5L47 119L32 108.5L19 95L10 85.5L6 77L4.5 63.5L3 46.5L2.5 28.5L1 1",
      routeOffset: { x: 599, y: 1418 } 
    },
    5: {
      patrolName: 'Patrulla 5',
      date: '05/May/2026',
      range: '19:00 - 20:10 hrs',
      distance: '22.1 km',
      avgSpeed: '42 km/h',
      events: ['1 Alerta (Salida de Geo-cerca)'],
      routePath: "M1 1L49.5 2L108.5 4H128L134 5.5V22.5V37.5L129 50.5V63L142.5 81L145.5 87.5V107.5L144.5 129.5L143.5 146.5L141.5 166.5L140.5 190.5L142 202.5L150.5 222.5L160 246L173.5 275.5L183.5 296.5L194.5 320L207.5 348L225.5 385.5L230 388L242 382L262 371.5L276 363.5L289 360.5L312.5 359.5L345.5 360.5L391.5 361.5L475.5 363L512 364",
      routeOffset: { x: 1341.5, y: 1345.5 }
    }
  };

  const handlePatrolClick = (id: number) => {
    if (id === 1 || id === 5) {
      setSelectedPatrolId(id);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="route-history-page">
          <Sidebar />
          
          <main className="map-view-container">
            {/* Mensaje superior instructivo (Glassmorphism) */}
            {!selectedPatrolId && (
              <div className="instruction-banner">
                <p>Seleccione una Patrulla en el mapa para ver su historial</p>
              </div>
            )}

            <MapViewport 
              imageSrc="/assets/mapa_santodomingo.png" 
              isDrawingMode={false}
              markers={
                <>
                  {PATROL_POSITIONS.map(patrol => (
                    <MapMarker 
                      key={patrol.id}
                      id={patrol.id}
                      type={selectedPatrolId === patrol.id ? 'active' : 'selectable'}
                      top={patrol.top}
                      left={patrol.left}
                      onClick={() => handlePatrolClick(patrol.id)}
                    />
                  ))}
                </>
              }
            >
              {/* Capa de la ruta seleccionada */}
              {selectedPatrolId && patrolData[selectedPatrolId] && (
                <svg 
                  className="route-path-layer"
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '1904px', 
                    height: '1865px',
                    pointerEvents: 'none'
                  }}
                >
                  <path 
                    d={patrolData[selectedPatrolId].routePath}
                    stroke="#00D427"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    fill="none"
                    transform={`translate(${patrolData[selectedPatrolId].routeOffset.x}, ${patrolData[selectedPatrolId].routeOffset.y})`}
                  />
                </svg>
              )}
            </MapViewport>

            {/* Controles de reproducción */}
            {selectedPatrolId && (
              <>
                <PlaybackControl 
                  startTime={patrolData[selectedPatrolId].range.split(' - ')[0]} 
                  endTime={patrolData[selectedPatrolId].range.split(' - ')[1].split(' ')[0]} 
                />
                
                <RouteSummaryPanel 
                  patrolName={patrolData[selectedPatrolId].patrolName}
                  onClose={() => setSelectedPatrolId(null)}
                  data={patrolData[selectedPatrolId]}
                />
              </>
            )}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RouteHistoryPage;
