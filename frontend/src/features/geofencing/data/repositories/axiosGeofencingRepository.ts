
import API from '../../../../core/config/axios';
import { GeofencingRepository, Geofence } from '../../domain/repositories/GeofencingRepository';

export const axiosGeofencingRepository: GeofencingRepository = {
  async getGeofences(): Promise<Geofence[]> {
    const response = await API.get<Geofence[]>('/geocercas');
    return response.data; // El backend devuelve el array directamente
  },

  async createGeofence(data: Omit<Geofence, 'id' | 'createdAt' | 'updatedAt'>): Promise<Geofence> {
    const response = await API.post<{ data: Geofence }>('/geocercas', data);
    return response.data.data;
  },

  async deleteGeofence(id: number): Promise<void> {
    await API.delete(`/geocercas/${id}`);
  }
};
