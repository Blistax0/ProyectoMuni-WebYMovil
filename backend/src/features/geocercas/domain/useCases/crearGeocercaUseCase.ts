
import { GeocercasRepository } from '../repositories/GeocercasRepository';
export const crearGeocercaUseCase = async (repo: GeocercasRepository, datos: any) => await repo.crear(datos);
