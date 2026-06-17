"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarGeocerca = exports.obtenerGeocercas = exports.crearGeocerca = void 0;
const sequelizeGeocercasRepository_1 = require("../data/repositories/sequelizeGeocercasRepository");
const crearGeocercaUseCase_1 = require("../domain/useCases/crearGeocercaUseCase");
const obtenerGeocercasUseCase_1 = require("../domain/useCases/obtenerGeocercasUseCase");
const eliminarGeocercaUseCase_1 = require("../domain/useCases/eliminarGeocercaUseCase");
const crearGeocerca = async (req, res) => {
    try {
        const result = await (0, crearGeocercaUseCase_1.crearGeocercaUseCase)(sequelizeGeocercasRepository_1.sequelizeGeocercasRepository, req.body);
        res.status(201).json({ mensaje: 'Zona de vigilancia creada', data: result });
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error al crear geocerca', error: error.message });
    }
};
exports.crearGeocerca = crearGeocerca;
const obtenerGeocercas = async (req, res) => {
    try {
        const result = await (0, obtenerGeocercasUseCase_1.obtenerGeocercasUseCase)(sequelizeGeocercasRepository_1.sequelizeGeocercasRepository);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};
exports.obtenerGeocercas = obtenerGeocercas;
const eliminarGeocerca = async (req, res) => {
    try {
        await (0, eliminarGeocercaUseCase_1.eliminarGeocercaUseCase)(sequelizeGeocercasRepository_1.sequelizeGeocercasRepository, req.params.id);
        res.status(200).json({ mensaje: 'Geocerca desactivada' });
    }
    catch (error) {
        if (error.message.includes('NOT_FOUND'))
            return res.status(404).json({ mensaje: 'Geocerca no encontrada' });
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};
exports.eliminarGeocerca = eliminarGeocerca;
