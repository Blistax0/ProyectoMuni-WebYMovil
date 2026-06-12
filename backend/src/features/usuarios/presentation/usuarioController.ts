
import { Request, Response } from 'express';
import { sequelizeUsuariosRepository } from '../data/repositories/sequelizeUsuariosRepository';
import { crearUsuarioUseCase } from '../domain/useCases/crearUsuarioUseCase';
import { obtenerUsuariosUseCase } from '../domain/useCases/obtenerUsuariosUseCase';
import { obtenerUsuarioPorIdUseCase } from '../domain/useCases/obtenerUsuarioPorIdUseCase';
import { actualizarUsuarioUseCase } from '../domain/useCases/actualizarUsuarioUseCase';
import { eliminarUsuarioUseCase } from '../domain/useCases/eliminarUsuarioUseCase';

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const result = await crearUsuarioUseCase(sequelizeUsuariosRepository, req.body);
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: result });
    } catch (error: any) { res.status(400).json({ mensaje: 'No pudimos registrar al usuario. Verifica los datos.' }); }
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const result = await obtenerUsuariosUseCase(sequelizeUsuariosRepository);
        res.status(200).json(result);
    } catch (error: any) { res.status(500).json({ mensaje: 'Hubo un problema al obtener los usuarios' }); }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
    try {
        const result = await obtenerUsuarioPorIdUseCase(sequelizeUsuariosRepository, req.params.id as string);
        if (!result) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(result);
    } catch (error: any) { res.status(500).json({ mensaje: 'Hubo un problema al buscar el usuario' }); }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const result = await actualizarUsuarioUseCase(sequelizeUsuariosRepository, req.params.id as string, req.body);
        res.status(200).json({ mensaje: 'Datos del usuario actualizados correctamente', data: result });
    } catch (error: any) {
        if (error.message.includes('NOT_FOUND')) return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(400).json({ mensaje: 'No pudimos actualizar la información.' });
    }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        await eliminarUsuarioUseCase(sequelizeUsuariosRepository, req.params.id as string);
        res.status(200).json({ mensaje: 'Usuario dado de baja exitosamente' });
    } catch (error: any) {
        if (error.message.includes('NOT_FOUND')) return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(500).json({ mensaje: 'Hubo un error al intentar dar de baja al usuario' });
    }
};
