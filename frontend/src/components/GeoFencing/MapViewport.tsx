import React, { useState, useRef, useEffect, useCallback } from 'react';
import './MapViewport.scss';

interface MapViewportProps {
  imageSrc: string;
  isDrawingMode: boolean;
  markers?: React.ReactNode;
  children?: React.ReactNode;
}

const MapViewport: React.FC<MapViewportProps> = ({ imageSrc, isDrawingMode, markers, children }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: -200, y: -200 }); // Posición inicial similar a Figma
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSize = { width: 1904, height: 1865 };

  const clampPosition = useCallback((x: number, y: number, currentScale: number) => {
    if (!containerRef.current) return { x, y };
    
    const vWidth = containerRef.current.clientWidth;
    const vHeight = containerRef.current.clientHeight;
    
    const scaledWidth = imageSize.width * currentScale;
    const scaledHeight = imageSize.height * currentScale;

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
    setStartPan({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newPos = clampPosition(
      e.clientX - startPan.x,
      e.clientY - startPan.y,
      scale
    );
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', (e) => e.preventDefault());
      }
    };
  }, []);

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
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`
        }}
      >
        <img src={imageSrc} alt="Map" className="map-image" draggable={false} />
        
        {/* Capa de Geo-cercas con coordenadas de Figma */}
        <svg 
          className="geofence-svg-layer" 
          viewBox="0 0 1904 1865"
          style={{ width: '1904px', height: '1865px' }}
        >
          {/* Zona Sur - Condominio */}
          <path 
            d="M1594 1180H1012L934 1280.5L1042.5 1560.5L1265 1593.5L1594 1549V1180Z" 
            className="geofence-polygon zone-sur"
            transform="translate(291, 110.5)"
          />
          {/* Zona Centro - Costa */}
          <path 
            d="M266.5 0.5L66.5 10H15.5L0.5 887.5H73.25H146L162 933.5H265L355.5 924.5L510.5 1000.5L691 961.5L699.5 850L266.5 0.5Z" 
            className="geofence-polygon zone-centro"
            transform="translate(291, 110.5)"
          />
        </svg>

        <div className="markers-layer">
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
