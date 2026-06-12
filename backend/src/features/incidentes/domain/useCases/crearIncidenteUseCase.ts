
import { IncidentesRepository } from '../repositories/IncidentesRepository';
export const crearIncidenteUseCase = async (repo: IncidentesRepository, datos: any) => await repo.crear(datos);
