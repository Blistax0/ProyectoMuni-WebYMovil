"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarLoginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarLoginUseCase = async (repository, correo, passwordPlana) => {
    const usuario = await repository.buscarPorCorreo(correo);
    if (!usuario) {
        throw new Error('AUTH_NOT_FOUND: Usuario no encontrado');
    }
    if (!usuario.estado) {
        throw new Error('AUTH_INACTIVE: El usuario está inactivo');
    }
    const passwordValida = await bcrypt_1.default.compare(passwordPlana, usuario.password_hash);
    if (!passwordValida) {
        throw new Error('AUTH_INVALID: Las credenciales ingresadas son incorrectas');
    }
    const payload = { id: usuario.id, rol: usuario.rol };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
    const usuarioSinPassword = usuario.toJSON();
    delete usuarioSinPassword.password_hash;
    return { token, usuario: usuarioSinPassword };
};
exports.validarLoginUseCase = validarLoginUseCase;
