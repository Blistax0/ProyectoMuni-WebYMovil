
import { PosicionesRepository } from '../repositories/PosicionesRepository';
export const guardarPosicionUseCase = async (repo: PosicionesRepository, datos: any) => await repo.guardar(datos);
