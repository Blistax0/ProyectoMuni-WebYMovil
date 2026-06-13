
import { PosicionesRepository } from '../repositories/PosicionesRepository';
export const obtenerHistorialUseCase = async (repo: PosicionesRepository, limit: number, offset: number) => {
    return await repo.obtenerHistorial(limit, offset);
};
