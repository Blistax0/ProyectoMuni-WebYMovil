"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCreacionUsuario = void 0;
const express_validator_1 = require("express-validator");
const validarCreacionUsuario = [
    (0, express_validator_1.body)('rut').notEmpty().withMessage('El RUT es obligatorio'),
    (0, express_validator_1.body)('nombre_completo').notEmpty().withMessage('El nombre completo es obligatorio'),
    (0, express_validator_1.body)('correo').isEmail().withMessage('Debe ser un correo válido'),
    (0, express_validator_1.body)('password_hash').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (0, express_validator_1.body)('rol').optional().isIn(['ADMIN', 'PATRULLERO']).withMessage('Rol inválido'),
    // Middleware que captura los errores
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Errores de validación',
                errores: errores.array()
            });
        }
        next();
    }
];
exports.validarCreacionUsuario = validarCreacionUsuario;
