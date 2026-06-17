"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarIncidente = exports.actualizarEstadoIncidente = exports.obtenerIncidentes = exports.crearIncidente = void 0;
const sequelizeIncidentesRepository_1 = require("../data/repositories/sequelizeIncidentesRepository");
const crearIncidenteUseCase_1 = require("../domain/useCases/crearIncidenteUseCase");
const obtenerIncidentesUseCase_1 = require("../domain/useCases/obtenerIncidentesUseCase");
const actualizarEstadoIncidenteUseCase_1 = require("../domain/useCases/actualizarEstadoIncidenteUseCase");
const eliminarIncidenteUseCase_1 = require("../domain/useCases/eliminarIncidenteUseCase");
const uploadService_1 = require("../../../core/services/uploadService"); // Servicio (Nube)
const crearIncidente = async (req, res) => {
    try {
        const datosIncidente = req.body;
        // EF 5: Si el frontend envía una foto (por ejemplo, en formato base64 en el campo 'foto')
        if (datosIncidente.foto) {
            // Subimos la foto a la nube de Cloudinary
            const urlNube = await uploadService_1.uploadService.subirImagen(datosIncidente.foto);
            // Asignamos la URL devuelta al campo que MySQL entiende
            datosIncidente.evidencia_url = urlNube;
            // Eliminamos el campo 'foto' pesado para no enviarlo a la BD
            delete datosIncidente.foto;
        }
        // Continuamos con el flujo normal de la Arquitectura Limpia
        const result = await (0, crearIncidenteUseCase_1.crearIncidenteUseCase)(sequelizeIncidentesRepository_1.sequelizeIncidentesRepository, datosIncidente);
        res.status(201).json({ mensaje: 'El incidente fue reportado con éxito', data: result });
    }
    catch (error) {
        res.status(400).json({
            mensaje: 'No pudimos registrar el incidente.',
            error: error.message
        });
    }
};
exports.crearIncidente = crearIncidente;
const obtenerIncidentes = async (req, res) => {
    try {
        // Capturamos los parámetros de la URL (Por defecto: pág 1, límite 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await (0, obtenerIncidentesUseCase_1.obtenerIncidentesUseCase)(sequelizeIncidentesRepository_1.sequelizeIncidentesRepository, limit, offset);
        res.status(200).json({
            mensaje: 'Incidentes cargados exitosamente',
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
        res.status(500).json({ mensaje: 'Hubo un problema interno al intentar cargar los incidentes' });
    }
};
exports.obtenerIncidentes = obtenerIncidentes;
const actualizarEstadoIncidente = async (req, res) => {
    try {
        const result = await (0, actualizarEstadoIncidenteUseCase_1.actualizarEstadoIncidenteUseCase)(sequelizeIncidentesRepository_1.sequelizeIncidentesRepository, req.params.id, req.body.estado_resolucion);
        res.status(200).json({ mensaje: 'El estado del incidente ha sido actualizado', data: result });
    }
    catch (error) {
        if (error.message.includes('NOT_FOUND'))
            return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(400).json({ mensaje: 'No pudimos actualizar el estado. Verifica que el estado enviado sea correcto.' });
    }
};
exports.actualizarEstadoIncidente = actualizarEstadoIncidente;
const eliminarIncidente = async (req, res) => {
    try {
        await (0, eliminarIncidenteUseCase_1.eliminarIncidenteUseCase)(sequelizeIncidentesRepository_1.sequelizeIncidentesRepository, req.params.id);
        res.status(200).json({ mensaje: 'Incidente eliminado exitosamente del registro' });
    }
    catch (error) {
        if (error.message.includes('NOT_FOUND'))
            return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al intentar borrar el incidente' });
    }
};
exports.eliminarIncidente = eliminarIncidente;
