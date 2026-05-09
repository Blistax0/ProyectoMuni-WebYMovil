import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MapViewport from '../../components/GeoFencing/MapViewport';
import PerimetersPanel from '../../components/GeoFencing/PerimetersPanel';
import DrawingTools from '../../components/GeoFencing/DrawingTools';
import MapMarker, { MarkerType } from '../../components/MapMarker/MapMarker';
import './GeoFencingPage.scss';

const GeoFencingPage: React.FC = () => {
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  const markers = [
    { id: 6, type: 'normal' as MarkerType, top: '481px', left: '494px' },
    { id: 4, type: 'normal' as MarkerType, top: '1348px', left: '1363px' },
    { id: 1, type: 'normal' as MarkerType, top: '1365px', left: '558px' },
    { id: 3, type: 'normal' as MarkerType, top: '904px', left: '796px' },
    { id: 5, type: 'normal' as MarkerType, top: '1663px', left: '1824px' },
    { id: 2, type: 'normal' as MarkerType, top: '32px', left: '1082px' },
  ];

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
                  {markers.map(m => (
                    <MapMarker 
                      key={m.id}
                      id={m.id}
                      type={m.type}
                      top={m.top}
                      left={m.left}
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
