
import { GeocercasRepository } from '../repositories/GeocercasRepository';
export const obtenerGeocercasUseCase = async (repo: GeocercasRepository) => await repo.obtenerActivas();
