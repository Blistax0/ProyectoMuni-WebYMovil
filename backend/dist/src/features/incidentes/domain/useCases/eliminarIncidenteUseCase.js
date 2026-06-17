"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarIncidenteUseCase = void 0;
const eliminarIncidenteUseCase = async (repo, id) => {
    const exists = await repo.obtenerPorId(id);
    if (!exists)
        throw new Error('NOT_FOUND: El incidente no existe o ya fue eliminado');
    await repo.eliminarFisicamente(id);
};
exports.eliminarIncidenteUseCase = eliminarIncidenteUseCase;
