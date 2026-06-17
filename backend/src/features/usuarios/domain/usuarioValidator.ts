import { Request, Response, NextFunction } from 'express';
import { body, validationResult  } from 'express-validator';

const validarCreacionUsuario = [
    body('rut').notEmpty().withMessage('El RUT es obligatorio'),
    body('nombre_completo').notEmpty().withMessage('El nombre completo es obligatorio'),
    body('correo').isEmail().withMessage('Debe ser un correo válido'),
    body('password_hash').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    //body('rol').optional().isIn(['ADMIN', 'PATRULLERO']).withMessage('Rol inválido'),
    
    // Middleware que captura los errores
    (req: Request, res: Response, next: NextFunction) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ 
                mensaje: 'Errores de validación', 
                errores: errores.array() 
            });
        }
        next();
    }
];

export { validarCreacionUsuario
 };
