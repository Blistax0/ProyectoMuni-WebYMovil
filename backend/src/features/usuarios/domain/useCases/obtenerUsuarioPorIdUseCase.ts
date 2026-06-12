
import { UsuariosRepository } from '../repositories/UsuariosRepository';
export const obtenerUsuarioPorIdUseCase = async (repository: UsuariosRepository, id: string) => await repository.obtenerPorId(id);
