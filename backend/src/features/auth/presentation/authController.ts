import { Request, Response, NextFunction } from 'express';
import { validarLoginUseCase } from '../domain/useCases/validarLoginUseCase';
import { sequelizeAuthRepository } from '../data/repositories/sequelizeAuthRepository';
import { crearUsuarioUseCase } from '../../usuarios/domain/useCases/crearUsuarioUseCase';
import { sequelizeUsuariosRepository } from '../../usuarios/data/repositories/sequelizeUsuariosRepository';

const login = async (req: Request, res: Response) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json({ mensaje: 'Por favor ingresa tu correo y tu contraseña' });
        }
        const resultado = await validarLoginUseCase(sequelizeAuthRepository, correo, password);
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', ...resultado });
    } catch (error: any) {
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

const register = async (req: Request, res: Response) => {
    try {
        const { rut, nombre_completo, correo, telefono, region, comuna, password_hash } = req.body;
        
        if (!rut || !nombre_completo || !correo || !password_hash) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios para el registro.' });
        }

        const nuevoUsuario = await crearUsuarioUseCase(sequelizeUsuariosRepository, {
            rut, nombre_completo, correo, telefono, region, comuna, password_hash, rol: 'PATRULLERO'
        });

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error: any) {
        console.error('Error en el registro:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: error.message });
    }
};

export { login, register };
