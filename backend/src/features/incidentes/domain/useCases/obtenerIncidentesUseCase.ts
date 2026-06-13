import { IncidentesRepository } from '../repositories/IncidentesRepository';

export const obtenerIncidentesUseCase = async (repo: IncidentesRepository, limit: number, offset: number) => {
    return await repo.obtenerTodos(limit, offset);
};