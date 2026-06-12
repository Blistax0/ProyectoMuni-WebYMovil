
import { Request, Response } from 'express';
import { sequelizeGeocercasRepository } from '../data/repositories/sequelizeGeocercasRepository';
import { crearGeocercaUseCase } from '../domain/useCases/crearGeocercaUseCase';
import { obtenerGeocercasUseCase } from '../domain/useCases/obtenerGeocercasUseCase';
import { eliminarGeocercaUseCase } from '../domain/useCases/eliminarGeocercaUseCase';

export const crearGeocerca = async (req: Request, res: Response) => {
    try {
        const result = await crearGeocercaUseCase(sequelizeGeocercasRepository, req.body);
        res.status(201).json({ mensaje: 'Zona de vigilancia creada', data: result });
    } catch (error: any) { res.status(400).json({ mensaje: 'Error al crear geocerca', error: error.message }); }
};

export const obtenerGeocercas = async (req: Request, res: Response) => {
    try {
        const result = await obtenerGeocercasUseCase(sequelizeGeocercasRepository);
        res.status(200).json(result);
    } catch (error: any) { res.status(500).json({ mensaje: 'Error interno', error: error.message }); }
};

export const eliminarGeocerca = async (req: Request, res: Response) => {
    try {
        await eliminarGeocercaUseCase(sequelizeGeocercasRepository, req.params.id as string);
        res.status(200).json({ mensaje: 'Geocerca desactivada' });
    } catch (error: any) {
        if (error.message.includes('NOT_FOUND')) return res.status(404).json({ mensaje: 'Geocerca no encontrada' });
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};
