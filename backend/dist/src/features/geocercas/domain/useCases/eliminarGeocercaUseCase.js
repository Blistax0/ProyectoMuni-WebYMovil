"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarGeocercaUseCase = void 0;
const eliminarGeocercaUseCase = async (repo, id) => {
    const exists = await repo.obtenerPorId(id);
    if (!exists)
        throw new Error('NOT_FOUND: Geocerca no encontrada');
    await repo.desactivar(id);
};
exports.eliminarGeocercaUseCase = eliminarGeocercaUseCase;
