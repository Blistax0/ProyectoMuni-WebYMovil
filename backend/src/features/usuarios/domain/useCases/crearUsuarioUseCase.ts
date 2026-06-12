
import { UsuariosRepository } from '../repositories/UsuariosRepository';

export const crearUsuarioUseCase = async (repository: UsuariosRepository, datos: any) => {
    const nuevo = await repository.crear(datos);
    const result = nuevo.toJSON();
    delete result.password_hash;
    return result;
};
