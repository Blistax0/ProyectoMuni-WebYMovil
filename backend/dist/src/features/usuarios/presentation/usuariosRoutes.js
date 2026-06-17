"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usuarioController_1 = require("../../../features/usuarios/presentation/usuarioController");
const usuarioValidator_1 = require("../../../features/usuarios/domain/usuarioValidator");
const authMiddleware_1 = require("../../../core/middlewares/authMiddleware");
// Rutas generales (No necesitan ID)
router.post('/', usuarioValidator_1.validarCreacionUsuario, usuarioController_1.crearUsuario);
router.get('/', authMiddleware_1.verificarToken, usuarioController_1.obtenerUsuarios);
// Rutas específicas (Necesitan el ID del usuario en la URL ejemplo: /api/usuarios/1)
router.get('/:id', authMiddleware_1.verificarToken, usuarioController_1.obtenerUsuarioPorId);
router.put('/:id', authMiddleware_1.verificarToken, usuarioController_1.actualizarUsuario);
router.delete('/:id', authMiddleware_1.verificarToken, usuarioController_1.eliminarUsuario);
exports.default = router;
