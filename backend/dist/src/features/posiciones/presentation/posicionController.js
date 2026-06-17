"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerHistorial = exports.guardarPosicion = void 0;
const sequelizePosicionesRepository_1 = require("../data/repositories/sequelizePosicionesRepository");
const guardarPosicionUseCase_1 = require("../domain/useCases/guardarPosicionUseCase");
const obtenerHistorialUseCase_1 = require("../domain/useCases/obtenerHistorialUseCase");
const guardarPosicion = async (req, res) => {
    try {
        const result = await (0, guardarPosicionUseCase_1.guardarPosicionUseCase)(sequelizePosicionesRepository_1.sequelizePosicionesRepository, req.body);
        res.status(201).json({ mensaje: 'Coordenada GPS guardada', data: result });
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar posición', error: error.message });
    }
};
exports.guardarPosicion = guardarPosicion;
const obtenerHistorial = async (req, res) => {
    try {
        // Capturamos los parámetros de la URL (Por defecto: página 1, límite 50 posiciones)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const offset = (page - 1) * limit; // Calculamos desde dónde empezar a cortar la lista de la BD
        const { count, rows } = await (0, obtenerHistorialUseCase_1.obtenerHistorialUseCase)(sequelizePosicionesRepository_1.sequelizePosicionesRepository, limit, offset);
        res.status(200).json({
            mensaje: 'Historial obtenido con éxito',
            paginacion: {
                total_registros: count,
                total_paginas: Math.ceil(count / limit),
                pagina_actual: page,
                registros_por_pagina: limit
            },
            data: rows
        });
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};
exports.obtenerHistorial = obtenerHistorial;
