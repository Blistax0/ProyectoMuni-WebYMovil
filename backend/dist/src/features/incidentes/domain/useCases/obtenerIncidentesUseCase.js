"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerIncidentesUseCase = void 0;
const obtenerIncidentesUseCase = async (repo, limit, offset) => {
    return await repo.obtenerTodos(limit, offset);
};
exports.obtenerIncidentesUseCase = obtenerIncidentesUseCase;
