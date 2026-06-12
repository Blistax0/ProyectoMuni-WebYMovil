
import { IncidentesRepository } from '../repositories/IncidentesRepository';
export const obtenerIncidentesUseCase = async (repo: IncidentesRepository) => await repo.obtenerTodos();
