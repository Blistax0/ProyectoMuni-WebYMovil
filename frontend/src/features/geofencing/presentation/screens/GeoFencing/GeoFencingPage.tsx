import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../../../../core/presentation/components/Sidebar/Sidebar';
import MapViewport from '../../../../../features/geofencing/presentation/components/GeoFencing/MapViewport';
import PerimetersPanel from '../../components/GeoFencing/PerimetersPanel';
import DrawingTools from '../../components/GeoFencing/DrawingTools';
import MapMarker from '../../../../../features/tracking/presentation/components/MapMarker/MapMarker';
import { PATROL_POSITIONS } from '../../../../../features/tracking/data/patrolPositions';
import { axiosGeofencingRepository } from '../../../data/repositories/axiosGeofencingRepository';
import { GeofencingUseCase } from '../../../domain/useCases/ejemploGeofencingUseCase';
import { Geofence } from '../../../domain/repositories/GeofencingRepository';
import './GeoFencingPage.scss';

import { ToolType } from '../../components/GeoFencing/DrawingTools';

const GeoFencingPage: React.FC = () => {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [draftPoints, setDraftPoints] = useState<number[][]>([]);
  const [draftColor, setDraftColor] = useState<string>('#1e88e5');
  const [activeTool, setActiveTool] = useState<ToolType>('polygon');

  const fetchGeofences = async () => {
    try {
      const useCase = new GeofencingUseCase(axiosGeofencingRepository);
      const data = await useCase.executeGetGeofences();
      setGeofences(data);
    } catch (error) {
      console.error("Error fetching geofences", error);
    }
  };

  React.useEffect(() => {
    fetchGeofences();
  }, []);

  const handleMapClick = (x: number, y: number) => {
    if (isDrawingMode && activeTool === 'polygon') {
      setDraftPoints(prev => [...prev, [x, y]]);
    }
  };

  const handleUndo = () => {
    setDraftPoints(prev => prev.slice(0, -1));
  };

  const handleSaveGeofence = async (name: string) => {
    if (draftPoints.length < 3) {
      alert("Un perímetro debe tener al menos 3 puntos.");
      return;
    }

    try {
      const useCase = new GeofencingUseCase(axiosGeofencingRepository);
      await useCase.executeCreateGeofence({
        nombre_zona: name,
        coordenadas_poligono: draftPoints,
        color_borde: draftColor,
        activa: true
      });
      fetchGeofences();
      toggleDrawingMode(); // Cerrar modo dibujo tras guardar
    } catch (error) {
      console.error("Error creating geofence", error);
      alert("Hubo un error al guardar la geocerca.");
    }
  };

  const handleDeleteGeofence = async (id: number) => {
    try {
      const useCase = new GeofencingUseCase(axiosGeofencingRepository);
      await useCase.executeDeleteGeofence(id);
      fetchGeofences();
    } catch (error) {
      console.error("Error deleting geofence", error);
    }
  };

  const toggleDrawingMode = () => {
    if (!isDrawingMode) {
      setDraftPoints([]);
      setActiveTool('polygon');
    } else {
      setDraftPoints([]);
    }
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
              geofences={geofences}
              onMapClick={handleMapClick}
              draftPoints={isDrawingMode ? draftPoints : []}
              draftColor={draftColor}
            />
            
            <DrawingTools 
              isVisible={isDrawingMode} 
              activeTool={activeTool}
              onSelectTool={setActiveTool}
              onUndo={handleUndo}
              color={draftColor}
              onColorChange={setDraftColor}
              hasPoints={draftPoints.length > 0}
            />
            
            <PerimetersPanel 
              isDrawingMode={isDrawingMode} 
              onToggleDrawing={toggleDrawingMode}
              geofences={geofences}
              onDelete={handleDeleteGeofence}
              onSave={handleSaveGeofence}
              canSave={draftPoints.length >= 3}
            />
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GeoFencingPage;
