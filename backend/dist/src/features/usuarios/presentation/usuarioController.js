"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.obtenerUsuarioPorId = exports.obtenerUsuarios = exports.crearUsuario = void 0;
const sequelizeUsuariosRepository_1 = require("../data/repositories/sequelizeUsuariosRepository");
const crearUsuarioUseCase_1 = require("../domain/useCases/crearUsuarioUseCase");
const obtenerUsuariosUseCase_1 = require("../domain/useCases/obtenerUsuariosUseCase");
const obtenerUsuarioPorIdUseCase_1 = require("../domain/useCases/obtenerUsuarioPorIdUseCase");
const actualizarUsuarioUseCase_1 = require("../domain/useCases/actualizarUsuarioUseCase");
const eliminarUsuarioUseCase_1 = require("../domain/useCases/eliminarUsuarioUseCase");
const crearUsuario = async (req, res) => {
    try {
        const result = await (0, crearUsuarioUseCase_1.crearUsuarioUseCase)(sequelizeUsuariosRepository_1.sequelizeUsuariosRepository, req.body);
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: result });
    }
    catch (error) {
        res.status(400).json({ mensaje: 'No pudimos registrar al usuario. Verifica los datos.' });
    }
};
exports.crearUsuario = crearUsuario;
const obtenerUsuarios = async (req, res) => {
    try {
        const result = await (0, obtenerUsuariosUseCase_1.obtenerUsuariosUseCase)(sequelizeUsuariosRepository_1.sequelizeUsuariosRepository);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al obtener los usuarios' });
    }
};
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const result = await (0, obtenerUsuarioPorIdUseCase_1.obtenerUsuarioPorIdUseCase)(sequelizeUsuariosRepository_1.sequelizeUsuariosRepository, req.params.id);
        if (!result)
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al buscar el usuario' });
    }
};
exports.obtenerUsuarioPorId = obtenerUsuarioPorId;
const actualizarUsuario = async (req, res) => {
    try {
        const result = await (0, actualizarUsuarioUseCase_1.actualizarUsuarioUseCase)(sequelizeUsuariosRepository_1.sequelizeUsuariosRepository, req.params.id, req.body);
        res.status(200).json({ mensaje: 'Datos del usuario actualizados correctamente', data: result });
    }
    catch (error) {
        if (error.message.includes('NOT_FOUND'))
            return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(400).json({ mensaje: 'No pudimos actualizar la información.' });
    }
};
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = async (req, res) => {
    try {
        await (0, eliminarUsuarioUseCase_1.eliminarUsuarioUseCase)(sequelizeUsuariosRepository_1.sequelizeUsuariosRepository, req.params.id);
        res.status(200).json({ mensaje: 'Usuario dado de baja exitosamente' });
    }
    catch (error) {
        if (error.message.includes('NOT_FOUND'))
            return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(500).json({ mensaje: 'Hubo un error al intentar dar de baja al usuario' });
    }
};
exports.eliminarUsuario = eliminarUsuario;
