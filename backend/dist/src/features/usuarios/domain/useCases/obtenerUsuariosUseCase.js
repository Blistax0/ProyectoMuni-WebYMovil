"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuariosUseCase = void 0;
const obtenerUsuariosUseCase = async (repository) => await repository.obtenerTodos();
exports.obtenerUsuariosUseCase = obtenerUsuariosUseCase;
