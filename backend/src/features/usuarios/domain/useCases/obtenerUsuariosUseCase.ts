
import { UsuariosRepository } from '../repositories/UsuariosRepository';
export const obtenerUsuariosUseCase = async (repository: UsuariosRepository) => await repository.obtenerTodos();
