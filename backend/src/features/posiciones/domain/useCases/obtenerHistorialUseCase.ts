
import { PosicionesRepository } from '../repositories/PosicionesRepository';
export const obtenerHistorialUseCase = async (repo: PosicionesRepository) => await repo.obtenerHistorial();
