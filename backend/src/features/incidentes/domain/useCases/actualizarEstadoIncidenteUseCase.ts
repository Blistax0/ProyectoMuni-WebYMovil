
import { IncidentesRepository } from '../repositories/IncidentesRepository';
export const actualizarEstadoIncidenteUseCase = async (repo: IncidentesRepository, id: string, estado: string) => {
    const updated = await repo.actualizarEstado(id, estado);
    if (!updated) throw new Error('NOT_FOUND: No encontramos el incidente solicitado');
    return updated;
};
