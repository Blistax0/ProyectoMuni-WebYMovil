"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioUseCase = void 0;
const crearUsuarioUseCase = async (repository, datos) => {
    const nuevo = await repository.crear(datos);
    const result = nuevo.toJSON();
    delete result.password_hash;
    return result;
};
exports.crearUsuarioUseCase = crearUsuarioUseCase;
