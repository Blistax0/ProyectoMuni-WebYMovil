"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearIncidenteUseCase = void 0;
const crearIncidenteUseCase = async (repo, datos) => await repo.crear(datos);
exports.crearIncidenteUseCase = crearIncidenteUseCase;
