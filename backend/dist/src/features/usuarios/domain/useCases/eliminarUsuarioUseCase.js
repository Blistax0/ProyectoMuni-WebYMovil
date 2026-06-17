"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuarioUseCase = void 0;
const eliminarUsuarioUseCase = async (repository, id) => {
    const exists = await repository.obtenerPorId(id);
    if (!exists)
        throw new Error('USUARIO_NOT_FOUND: Usuario no encontrado');
    await repository.desactivar(id);
};
exports.eliminarUsuarioUseCase = eliminarUsuarioUseCase;
