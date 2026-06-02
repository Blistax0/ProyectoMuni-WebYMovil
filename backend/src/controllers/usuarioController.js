const Usuario = require('../models/Usuario');

// POST: Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        
        // Esto para evitar enviar la contraseña encriptada en la respuesta por seguridad
        const usuarioSinPassword = nuevoUsuario.toJSON();
        delete usuarioSinPassword.password_hash;

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: usuarioSinPassword });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(400).json({ mensaje: 'No pudimos registrar al usuario. Verifica los datos enviados.' });
    }
};

// GET: Obtener todos los usuarios activos
const obtenerUsuarios = async (req, res) => {
    try {
        // Solo traemos a los que tienen estado: true
        const usuarios = await Usuario.findAll({ 
            where: { estado: true },
            attributes: { exclude: ['password_hash'] } 
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ mensaje: 'Hubo un problema en el servidor al intentar obtener los usuarios' });
    }
};

// GET: Obtener un solo usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['password_hash'] }
        });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al buscar usuario por ID:', error);
        res.status(500).json({ mensaje: 'Hubo un problema en el servidor al buscar el usuario' });
    }
};

// PUT: Actualizar datos de un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'No se encontró el usuario que intentas actualizar' });
        }
        
        const { nombre_completo, correo, telefono, region, comuna } = req.body;
        
        await usuario.update({
            nombre_completo,
            correo,
            telefono,
            region,
            comuna
        });
        
        const usuarioActualizado = usuario.toJSON();
        delete usuarioActualizado.password_hash;

        res.status(200).json({ mensaje: 'Datos del usuario actualizados correctamente', data: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(400).json({ mensaje: 'No pudimos actualizar la información. Revisa los datos enviados.' });
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
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al intentar dar de baja al usuario' });
    }
};

module.exports = { 
    crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario 
};