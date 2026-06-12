
import { GeocercasRepository } from '../repositories/GeocercasRepository';
export const eliminarGeocercaUseCase = async (repo: GeocercasRepository, id: string) => {
    const exists = await repo.obtenerPorId(id);
    if (!exists) throw new Error('NOT_FOUND: Geocerca no encontrada');
    await repo.desactivar(id);
};
