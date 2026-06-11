import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../../../../core/presentation/components/Sidebar/Sidebar';
import MapViewport from '../../../../../features/geofencing/presentation/components/GeoFencing/MapViewport';
import PerimetersPanel from '../../components/GeoFencing/PerimetersPanel';
import DrawingTools from '../../components/GeoFencing/DrawingTools';
import MapMarker from '../../../../../features/tracking/presentation/components/MapMarker/MapMarker';
import { PATROL_POSITIONS } from '../../../../../features/tracking/data/patrolPositions';
import './GeoFencingPage.scss';

const GeoFencingPage: React.FC = () => {
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="geofencing-page">
          <Sidebar />
          
          <main className="map-view-container">
            <MapViewport 
              imageSrc="/assets/mapa_santodomingo.png" 
              isDrawingMode={isDrawingMode}
              markers={
                <>
                  {PATROL_POSITIONS.map(patrol => (
                    <MapMarker 
                      key={patrol.id}
                      id={patrol.id}
                      type="normal"
                      top={patrol.top}
                      left={patrol.left}
                    />
                  ))}
                </>
              }
            />
            
            <DrawingTools isVisible={isDrawingMode} />
            
            <PerimetersPanel 
              isDrawingMode={isDrawingMode} 
              onToggleDrawing={toggleDrawingMode}
            />
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GeoFencingPage;
