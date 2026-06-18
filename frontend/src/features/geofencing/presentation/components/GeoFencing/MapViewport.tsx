import React, { useState, useRef, useEffect, useCallback } from 'react';
import './MapViewport.scss';

import { Geofence } from '../../../domain/repositories/GeofencingRepository';

interface MapViewportProps {
  imageSrc: string;
  isDrawingMode: boolean;
  markers?: React.ReactNode;
  children?: React.ReactNode;
  geofences?: Geofence[];
  onMapClick?: (x: number, y: number) => void;
  draftPoints?: number[][];
  draftColor?: string;
}

// Tamaño real del mapa base de Santo Domingo (extraído de Figma)
const MAP_IMAGE_SIZE = { width: 1904, height: 1865 };

const MapViewport: React.FC<MapViewportProps> = ({
  imageSrc, isDrawingMode, markers, children, geofences = [], onMapClick, draftPoints = [], draftColor = '#FF0000'
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: -200, y: -200 }); // Posición inicial equivalente a Figma
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const clampPosition = useCallback((x: number, y: number, currentScale: number) => {
    if (!containerRef.current) return { x, y };

    const vWidth = containerRef.current.clientWidth;
    const vHeight = containerRef.current.clientHeight;

    const scaledWidth = MAP_IMAGE_SIZE.width * currentScale;
    const scaledHeight = MAP_IMAGE_SIZE.height * currentScale;

    // Límites: la imagen no puede dejar ver el fondo si es más grande que el viewport
    let minX = vWidth - scaledWidth;
    let maxX = 0;
    let minY = vHeight - scaledHeight;
    let maxY = 0;

    // Si la imagen es más pequeña que el viewport, la centramos
    if (scaledWidth < vWidth) {
      minX = maxX = (vWidth - scaledWidth) / 2;
    }
    if (scaledHeight < vHeight) {
      minY = maxY = (vHeight - scaledHeight) / 2;
    }

    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y))
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.15;
    const direction = e.deltaY > 0 ? -1 : 1;
    const newScale = Math.max(0.6, Math.min(3, scale + direction * zoomSpeed));

    // Al hacer zoom, ajustamos la posición para mantener los límites
    const newPos = clampPosition(position.x, position.y, newScale);

    setScale(newScale);
    setPosition(newPos);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setMouseMoved(false);
    setStartPan({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseMoved(true);
    const newPos = clampPosition(
      e.clientX - startPan.x,
      e.clientY - startPan.y,
      scale
    );
    setPosition(newPos);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo registramos clic si no arrastramos el mapa
    if (!mouseMoved && onMapClick) {
      const rect = e.currentTarget.getBoundingClientRect();
      // Calcular posición (x, y) real de la imagen sin escala
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      onMapClick(Math.round(x), Math.round(y));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    // Referencia nombrada para poder eliminar exactamente el mismo listener (fix memory leak)
    const preventDefaultScroll = (e: WheelEvent) => e.preventDefault();
    if (container) {
      container.addEventListener('wheel', preventDefaultScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', preventDefaultScroll);
      }
    };
  }, []);

  // Para el polígono borrador
  const draftPointsString = draftPoints.map(coord => `${coord[0]},${coord[1]}`).join(' ');

  return (
    <div
      className={`map-viewport ${isDragging ? 'dragging' : ''} ${isDrawingMode ? 'drawing-mode' : ''}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className="map-transform-layer"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          width: `${MAP_IMAGE_SIZE.width}px`,
          height: `${MAP_IMAGE_SIZE.height}px`
        }}
        onClick={handleMapClick}
      >
        <img src={imageSrc} alt="Map" className="map-image" draggable={false} />

        {/* Capa de Geo-cercas dinámicas */}
        <svg
          className="geofence-svg-layer"
          viewBox="0 0 1904 1865"
          style={{ width: '1904px', height: '1865px', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
        >
          {geofences.map(zone => {
            if (!zone.coordenadas_poligono || !Array.isArray(zone.coordenadas_poligono)) return null;
            // Convertimos [x,y] a string "x,y" para SVG polygon
            const pointsString = zone.coordenadas_poligono.map(coord => `${coord[0]},${coord[1]}`).join(' ');
            return (
              <polygon
                key={zone.id}
                points={pointsString}
                fill={zone.color_borde + '40'} // Añadir transparencia al fill
                stroke={zone.color_borde}
                strokeWidth="4"
              />
            );
          })}

          {/* Polígono borrador */}
          {draftPoints.length > 0 && (
            <>
              <polygon
                points={draftPointsString}
                fill={draftColor + '40'}
                stroke={draftColor}
                strokeWidth="4"
                strokeDasharray="10, 10"
              />
              {draftPoints.map((point, i) => (
                <circle
                  key={`draft-${i}`}
                  cx={point[0]}
                  cy={point[1]}
                  r="12"
                  fill="white"
                  stroke={draftColor}
                  strokeWidth="4"
                />
              ))}
            </>
          )}
        </svg>

        <div className="markers-layer" style={{ pointerEvents: isDrawingMode ? 'none' : 'auto' }}>
          {markers}
        </div>

        {children}
      </div>

      <div className="zoom-indicator">
        Zoom: {Math.round(scale * 100)}%
      </div>
    </div>
  );
};

export default MapViewport;
