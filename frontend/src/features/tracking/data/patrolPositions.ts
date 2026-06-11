import { MarkerType } from '../../../features/tracking/presentation/components/MapMarker/MapMarker';

/**
 * Posiciones de las patrullas en el mapa de Santo Domingo.
 * Coordenadas extraídas del diseño en Figma (imagen base: 1904x1865px).
 * Fuente única de verdad — usada en Dashboard, GeoFencing y RouteHistory.
 */
export interface PatrolPosition {
  id: number;
  top: string;
  left: string;
}

export const PATROL_POSITIONS: PatrolPosition[] = [
  { id: 1, top: '1365px', left: '558px'  },
  { id: 2, top: '32px',   left: '1082px' },
  { id: 3, top: '904px',  left: '796px'  },
  { id: 4, top: '1348px', left: '1363px' },
  { id: 5, top: '1663px', left: '1824px' },
  { id: 6, top: '481px',  left: '494px'  },
];

/**
 * Estado de cada patrulla en el monitoreo en vivo.
 * Mapeado por ID de patrulla → tipo de marcador visual.
 */
export const PATROL_LIVE_STATUS: Record<number, MarkerType> = {
  1: 'emergency',
  2: 'emergency',
  3: 'normal',
  4: 'normal',
  5: 'alert',
  6: 'normal',
};
