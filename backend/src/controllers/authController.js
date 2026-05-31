const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validar que vengan los datos
        if (!correo || !password) {
            return res.status(400).json({ mensaje: 'Por favor ingresa tu correo y tu contraseña' });
        }

        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar que esté activo
        if (!usuario.estado) {
            return res.status(403).json({ mensaje: 'El usuario está inactivo' });
        }

        // Comparar contraseñas
        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Las credenciales ingresadas son incorrectas' });
        }

        // Generar JWT
        const payload = {
            id: usuario.id,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h' // El token expira en 8 horas
        });

        // Enviar respuesta con el token y datos básicos
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre_completo,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Hubo un problema en el servidor al intentar iniciar sesión. Por favor intenta de nuevo.', error: error.message });
    }
};

module.exports = {
    login
};
