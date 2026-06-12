import express from 'express';
const router = express.Router();
import { crearUsuario, 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario 
 } from '../../../features/usuarios/presentation/usuarioController';
import { validarCreacionUsuario  } from '../../../features/usuarios/domain/usuarioValidator';
import { verificarToken  } from '../../../core/middlewares/authMiddleware';

// Rutas generales (No necesitan ID)
router.post('/', validarCreacionUsuario, crearUsuario);
router.get('/', verificarToken, obtenerUsuarios);

// Rutas específicas (Necesitan el ID del usuario en la URL ejemplo: /api/usuarios/1)
router.get('/:id', verificarToken, obtenerUsuarioPorId);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

export default router;