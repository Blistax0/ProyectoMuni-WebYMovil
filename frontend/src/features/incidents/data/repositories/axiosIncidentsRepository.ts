
import API from '../../../../core/config/axios';
import { IncidentsRepository } from '../../domain/repositories/IncidentsRepository';

// Definimos la estructura del Incidente aquí para que todo el módulo la comparta
export interface Incident {
  id: number;
  tipo_incidente: string; // Antes era 'titulo'
  descripcion: string;
  nivel_gravedad: 'BAJA' | 'MEDIA' | 'ALTA'; // Antes era 'gravedad'
  estado_resolucion: 'PENDIENTE' | 'EN_PROCESO' | 'RESUELTO'; // Antes era 'estado'
  latitud: number;
  longitud: number;
  evidencia_url?: string;
  patrullero_id?: number;
  createdAt: string;
}

// No necesitamos API_URL hardcodeada porque API baseURL ya lo tiene (ej. '/incidentes')

export class AxiosIncidentsRepository implements IncidentsRepository {
  
  // 1. Petición al Backend para obtener todos los incidentes
  async getIncidents(token: string): Promise<Incident[]> {
    // API ya inyecta el token automáticamente vía interceptor
    const response = await API.get<{ data: Incident[] }>('/incidentes');
    return response.data.data;
  }

  // 2. Petición al Backend para actualizar el estado (Pendiente, En Proceso, Resuelto)
  async updateIncidentStatus(id: number, status: string, token: string): Promise<Incident> {
    const response = await API.put<{ data: Incident }>(`/incidentes/${id}`, 
      { estado_resolucion: status }
    );
    return response.data.data;
  }

  // 3. Crear un nuevo incidente
  async createIncident(data: Omit<Incident, 'id' | 'createdAt' | 'estado_resolucion'>, token: string): Promise<Incident> {
    const response = await API.post<{ data: Incident }>('/incidentes', data);
    return response.data.data;
  }
}