
import { Request, Response } from 'express';
import { sequelizePosicionesRepository } from '../data/repositories/sequelizePosicionesRepository';
import { guardarPosicionUseCase } from '../domain/useCases/guardarPosicionUseCase';
import { obtenerHistorialUseCase } from '../domain/useCases/obtenerHistorialUseCase';

export const guardarPosicion = async (req: Request, res: Response) => {
    try {
        const result = await guardarPosicionUseCase(sequelizePosicionesRepository, req.body);
        res.status(201).json({ mensaje: 'Coordenada GPS guardada', data: result });
    } catch (error: any) { res.status(400).json({ mensaje: 'Error al guardar posición', error: error.message }); }
};

export const obtenerHistorial = async (req: Request, res: Response) => {
    try {
        const result = await obtenerHistorialUseCase(sequelizePosicionesRepository);
        res.status(200).json(result);
    } catch (error: any) { res.status(500).json({ mensaje: 'Error interno', error: error.message }); }
};
