import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    // Leer el header Authorization
    const authHeader = req.headers['authorization'];
    
    // Formato esperado: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token con la clave secreta
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Adjuntar los datos del usuario decodificados al objeto req
        (req as any).usuario = payload;
        
        // Continuar al siguiente middleware o controlador
        next();
    } catch (error: any) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

export { verificarToken
 };
