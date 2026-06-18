import { IncidentsRepository } from '../repositories/IncidentsRepository';
import { Incident } from '../../data/repositories/axiosIncidentsRepository';

export class IncidentsUseCase {
  private repository: IncidentsRepository;

  // El constructor recibe cualquier repositorio que firme el contrato anterior
  constructor(repository: IncidentsRepository) {
    this.repository = repository;
  }

  // Acción: Cargar los reportes en la tabla del administrador
  async executeGetIncidents(token: string): Promise<Incident[]> {
    if (!token) throw new Error("Token de autenticación no proporcionado");
    return await this.repository.getIncidents(token);
  }

  // Acción: Modificar el estado de un incidente (Pendiente -> En Proceso -> Resuelto)
  async executeUpdateStatus(id: number, status: string, token: string): Promise<Incident> {
    if (!id) throw new Error("El ID del incidente es requerido");
    if (!status) throw new Error("El nuevo estado es obligatorio");
    if (!token) throw new Error("Token de autenticación no proporcionado");
    
    return await this.repository.updateIncidentStatus(id, status, token);
  }

  // Acción: Crear un nuevo incidente desde el monitor móvil
  async executeCreateIncident(data: Omit<Incident, 'id' | 'createdAt' | 'estado_resolucion'>, token: string): Promise<Incident> {
    if (!token) throw new Error("Token de autenticación no proporcionado");
    if (!data.tipo_incidente || !data.nivel_gravedad || !data.descripcion) {
      throw new Error("Faltan datos requeridos para el incidente");
    }
    return await this.repository.createIncident(data, token);
  }
}
