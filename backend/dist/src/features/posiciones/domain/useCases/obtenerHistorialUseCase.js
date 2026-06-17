"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerHistorialUseCase = void 0;
const obtenerHistorialUseCase = async (repo, limit, offset) => {
    return await repo.obtenerHistorial(limit, offset);
};
exports.obtenerHistorialUseCase = obtenerHistorialUseCase;
