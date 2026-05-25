const Usuario = require('../models/Usuario');

// POST: Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json({ mensaje: 'Usuario registrado', data: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar', error: error.message });
    }
};

// GET: Obtener todos los usuarios activos
const obtenerUsuarios = async (req, res) => {
    try {
        // Solo traemos a los que tienen estado: true
        const usuarios = await Usuario.findAll({ where: { estado: true } });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

// GET: Obtener un solo usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

// PUT: Actualizar datos de un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Actualizamos los datos con lo que venga en el body
        await usuario.update(req.body);
        res.status(200).json({ mensaje: 'Usuario actualizado', data: usuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// DELETE: Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // En lugar de borrarlo de la base de datos, lo desactivamos
        usuario.estado = false;
        await usuario.save();
        
        res.status(200).json({ mensaje: 'Usuario dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

module.exports = { 
    crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario 
};