import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    // Leer el header Authorization
    const authHeader = req.headers['authorization'];
    
    // Formato esperado: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token con la clave secreta
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adjuntar los datos del usuario decodificados al objeto req
        req.usuario = payload;
        
        // Continuar al siguiente middleware o controlador
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = {
    verificarToken
};
