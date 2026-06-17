"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const validarLoginUseCase_1 = require("../domain/useCases/validarLoginUseCase");
const sequelizeAuthRepository_1 = require("../data/repositories/sequelizeAuthRepository");
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json({ mensaje: 'Por favor ingresa tu correo y tu contraseña' });
        }
        const resultado = await (0, validarLoginUseCase_1.validarLoginUseCase)(sequelizeAuthRepository_1.sequelizeAuthRepository, correo, password);
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', ...resultado });
    }
    catch (error) {
        console.error('Error en el login:', error);
        let status = 500;
        let mensaje = 'Hubo un problema en el servidor al intentar iniciar sesión.';
        if (error.message.startsWith('AUTH_')) {
            status = 401;
            mensaje = error.message.split(': ')[1];
        }
        res.status(status).json({ mensaje });
    }
};
exports.login = login;
