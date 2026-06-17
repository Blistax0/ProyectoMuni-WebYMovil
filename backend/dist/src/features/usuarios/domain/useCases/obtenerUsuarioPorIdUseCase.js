"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarioPorIdUseCase = void 0;
const obtenerUsuarioPorIdUseCase = async (repository, id) => await repository.obtenerPorId(id);
exports.obtenerUsuarioPorIdUseCase = obtenerUsuarioPorIdUseCase;
