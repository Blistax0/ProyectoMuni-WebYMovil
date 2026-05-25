const express = require('express');
const router = express.Router();
const { 
    crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario 
} = require('../controllers/usuarioController');

// Rutas generales (No necesitan ID)
router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);

// Rutas específicas (Necesitan el ID del usuario en la URL ejemplo: /api/usuarios/1)
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;