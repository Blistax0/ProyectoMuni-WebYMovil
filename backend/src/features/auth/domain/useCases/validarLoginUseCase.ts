import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/AuthRepository';

export const validarLoginUseCase = async (repository: AuthRepository, correo: string, passwordPlana: string) => {
    const usuario = await repository.buscarPorCorreo(correo);
    if (!usuario) {
        throw new Error('AUTH_NOT_FOUND: Usuario no encontrado');
    }
    if (!usuario.estado) {
        throw new Error('AUTH_INACTIVE: El usuario está inactivo');
    }
    const passwordValida = await bcrypt.compare(passwordPlana, usuario.password_hash);
    if (!passwordValida) {
        throw new Error('AUTH_INVALID: Las credenciales ingresadas son incorrectas');
    }
    
    const payload = { id: usuario.id, rol: usuario.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '8h' });
    
    const usuarioSinPassword = usuario.toJSON();
    delete usuarioSinPassword.password_hash;
    
    return { token, usuario: usuarioSinPassword };
};
