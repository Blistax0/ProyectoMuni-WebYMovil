"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEstadoIncidenteUseCase = void 0;
const actualizarEstadoIncidenteUseCase = async (repo, id, estado) => {
    const updated = await repo.actualizarEstado(id, estado);
    if (!updated)
        throw new Error('NOT_FOUND: No encontramos el incidente solicitado');
    return updated;
};
exports.actualizarEstadoIncidenteUseCase = actualizarEstadoIncidenteUseCase;
