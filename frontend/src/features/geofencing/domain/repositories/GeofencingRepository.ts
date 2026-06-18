
export interface Geofence {
  id: number;
  nombre_zona: string;
  coordenadas_poligono: number[][]; // Array de tuplas [lat, lng]
  color_borde: string;
  activa: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeofencingRepository {
  getGeofences(): Promise<Geofence[]>;
  createGeofence(data: Omit<Geofence, 'id' | 'createdAt' | 'updatedAt'>): Promise<Geofence>;
  deleteGeofence(id: number): Promise<void>;
}
