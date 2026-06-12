const express = require('express');
const router = express.Router();
const { 
    crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario 
} = require('../../../features/usuarios/presentation/usuarioController');
const { validarCreacionUsuario } = require('../../../features/usuarios/domain/usuarioValidator');
const { verificarToken } = require('../../../core/middlewares/authMiddleware');

// Rutas generales (No necesitan ID)
router.post('/', validarCreacionUsuario, crearUsuario);
router.get('/', verificarToken, obtenerUsuarios);

// Rutas específicas (Necesitan el ID del usuario en la URL ejemplo: /api/usuarios/1)
router.get('/:id', verificarToken, obtenerUsuarioPorId);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

module.exports = router;