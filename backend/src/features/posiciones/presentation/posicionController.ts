
import { Request, Response } from 'express';
import { sequelizePosicionesRepository } from '../data/repositories/sequelizePosicionesRepository';
import { guardarPosicionUseCase } from '../domain/useCases/guardarPosicionUseCase';
import { obtenerHistorialUseCase } from '../domain/useCases/obtenerHistorialUseCase';

export const guardarPosicion = async (req: Request, res: Response) => {
    try {
        const result = await guardarPosicionUseCase(sequelizePosicionesRepository, req.body);
        res.status(201).json({ mensaje: 'Coordenada GPS guardada', data: result });
    } catch (error: any) { 
        res.status(400).json({ mensaje: 'Error al guardar posición', error: error.message }); }
};

export const obtenerHistorial = async (req: Request, res: Response) => {
    try {
        // Capturamos los parámetros de la URL (Por defecto: página 1, límite 50 posiciones)
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;
        
        const offset = (page - 1) * limit; // Calculamos desde dónde empezar a cortar la lista de la BD

        const { count, rows } = await obtenerHistorialUseCase(sequelizePosicionesRepository, limit, offset);

        res.status(200).json({
            mensaje: 'Historial obtenido con éxito',
            paginacion: {
                total_registros: count,
                total_paginas: Math.ceil(count / limit),
                pagina_actual: page,
                registros_por_pagina: limit
            },
            data: rows
        });
    } catch (error: any) { 
        res.status(500).json({ mensaje: 'Error interno', error: error.message }); 
    }
};
