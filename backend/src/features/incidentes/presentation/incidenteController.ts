
import { Request, Response } from 'express';
import { sequelizeIncidentesRepository } from '../data/repositories/sequelizeIncidentesRepository';
import { crearIncidenteUseCase } from '../domain/useCases/crearIncidenteUseCase';
import { obtenerIncidentesUseCase } from '../domain/useCases/obtenerIncidentesUseCase';
import { actualizarEstadoIncidenteUseCase } from '../domain/useCases/actualizarEstadoIncidenteUseCase';
import { eliminarIncidenteUseCase } from '../domain/useCases/eliminarIncidenteUseCase';

export const crearIncidente = async (req: Request, res: Response) => {
    try {
        const result = await crearIncidenteUseCase(sequelizeIncidentesRepository, req.body);
        res.status(201).json({ mensaje: 'El incidente fue reportado con éxito', data: result });
    } catch (error: any) { res.status(400).json({ mensaje: 'No pudimos registrar el incidente. Revisa los datos enviados.' }); }
};

export const obtenerIncidentes = async (req: Request, res: Response) => {
    try {
        const result = await obtenerIncidentesUseCase(sequelizeIncidentesRepository);
        res.status(200).json(result);
    } catch (error: any) { res.status(500).json({ mensaje: 'Hubo un problema interno al intentar cargar los incidentes' }); }
};

export const actualizarEstadoIncidente = async (req: Request, res: Response) => {
    try {
        const result = await actualizarEstadoIncidenteUseCase(sequelizeIncidentesRepository, req.params.id as string, req.body.estado_resolucion);
        res.status(200).json({ mensaje: 'El estado del incidente ha sido actualizado', data: result });
    } catch (error: any) {
        if (error.message.includes('NOT_FOUND')) return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(400).json({ mensaje: 'No pudimos actualizar el estado. Verifica que el estado enviado sea correcto.' });
    }
};

export const eliminarIncidente = async (req: Request, res: Response) => {
    try {
        await eliminarIncidenteUseCase(sequelizeIncidentesRepository, req.params.id as string);
        res.status(200).json({ mensaje: 'Incidente eliminado exitosamente del registro' });
    } catch (error: any) {
        if (error.message.includes('NOT_FOUND')) return res.status(404).json({ mensaje: error.message.split(': ')[1] });
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al intentar borrar el incidente' });
    }
};
