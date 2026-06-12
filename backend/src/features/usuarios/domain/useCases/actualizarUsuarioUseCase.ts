
import { UsuariosRepository } from '../repositories/UsuariosRepository';
export const actualizarUsuarioUseCase = async (repository: UsuariosRepository, id: string, datos: any) => {
    const updated = await repository.actualizar(id, datos);
    if (!updated) throw new Error('USUARIO_NOT_FOUND: No se encontró el usuario que intentas actualizar');
    const result = updated.toJSON();
    delete result.password_hash;
    return result;
};
