
import { IncidentesRepository } from '../repositories/IncidentesRepository';
export const eliminarIncidenteUseCase = async (repo: IncidentesRepository, id: string) => {
    const exists = await repo.obtenerPorId(id);
    if (!exists) throw new Error('NOT_FOUND: El incidente no existe o ya fue eliminado');
    await repo.eliminarFisicamente(id);
};
