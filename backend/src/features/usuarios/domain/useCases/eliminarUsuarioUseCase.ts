
import { UsuariosRepository } from '../repositories/UsuariosRepository';
export const eliminarUsuarioUseCase = async (repository: UsuariosRepository, id: string) => {
    const exists = await repository.obtenerPorId(id);
    if (!exists) throw new Error('USUARIO_NOT_FOUND: Usuario no encontrado');
    await repository.desactivar(id);
};
