
import { Incident } from '../../data/repositories/axiosIncidentsRepository';

export interface IncidentsRepository {
  // Define que quien implemente esto debe ser capaz de traer la lista de incidentes
  getIncidents(token: string): Promise<Incident[]>;
  
  // Define que quien implemente esto debe ser capaz de actualizar el estado
  updateIncidentStatus(id: number, status: string, token: string): Promise<Incident>;

  // Define que quien implemente esto debe ser capaz de reportar un nuevo incidente
  createIncident(data: Omit<Incident, 'id' | 'createdAt' | 'estado_resolucion'>, token: string): Promise<Incident>;
}