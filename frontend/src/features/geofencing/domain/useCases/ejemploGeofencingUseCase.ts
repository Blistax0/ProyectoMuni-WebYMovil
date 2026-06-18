
import { GeofencingRepository, Geofence } from '../repositories/GeofencingRepository';

export class GeofencingUseCase {
  private repository: GeofencingRepository;

  constructor(repository: GeofencingRepository) {
    this.repository = repository;
  }

  async executeGetGeofences(): Promise<Geofence[]> {
    return await this.repository.getGeofences();
  }

  async executeCreateGeofence(data: Omit<Geofence, 'id' | 'createdAt' | 'updatedAt'>): Promise<Geofence> {
    if (!data.nombre_zona) throw new Error("Nombre de zona requerido");
    if (!data.coordenadas_poligono || data.coordenadas_poligono.length < 3) {
      throw new Error("El polígono debe tener al menos 3 coordenadas");
    }
    return await this.repository.createGeofence(data);
  }

  async executeDeleteGeofence(id: number): Promise<void> {
    return await this.repository.deleteGeofence(id);
  }
}
