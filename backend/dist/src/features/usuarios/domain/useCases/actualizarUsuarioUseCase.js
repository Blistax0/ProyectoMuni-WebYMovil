"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarUsuarioUseCase = void 0;
const actualizarUsuarioUseCase = async (repository, id, datos) => {
    const updated = await repository.actualizar(id, datos);
    if (!updated)
        throw new Error('USUARIO_NOT_FOUND: No se encontró el usuario que intentas actualizar');
    const result = updated.toJSON();
    delete result.password_hash;
    return result;
};
exports.actualizarUsuarioUseCase = actualizarUsuarioUseCase;
