
import axios from 'axios';
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

const API_URL = 'http://localhost:3000/api/incidentes';

export class AxiosIncidentsRepository implements IncidentsRepository {
  
  // 1. Petición al Backend para obtener todos los incidentes
  async getIncidents(token: string): Promise<Incident[]> {
    const response = await axios.get<{ data: Incident[] }>(API_URL, {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    // El backend devuelve { mensaje, paginacion, data }
    return response.data.data;
  }

  // 2. Petición al Backend para actualizar el estado (Pendiente, En Proceso, Resuelto)
  async updateIncidentStatus(id: number, status: string, token: string): Promise<Incident> {
    const response = await axios.put<{ data: Incident }>(`${API_URL}/${id}`, 
      { estado_resolucion: status },
      { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      }
    );
    // El backend devuelve { mensaje, data }
    return response.data.data;
  }
}