
import { Request, Response } from 'express';
import { sequelizeIncidentesRepository } from '../data/repositories/sequelizeIncidentesRepository';
import { crearIncidenteUseCase } from '../domain/useCases/crearIncidenteUseCase';
import { obtenerIncidentesUseCase } from '../domain/useCases/obtenerIncidentesUseCase';
import { actualizarEstadoIncidenteUseCase } from '../domain/useCases/actualizarEstadoIncidenteUseCase';
import { eliminarIncidenteUseCase } from '../domain/useCases/eliminarIncidenteUseCase';
import { uploadService } from '../../../core/services/uploadService'; // Servicio (Nube)

export const crearIncidente = async (req: Request, res: Response) => {
    try {
        const datosIncidente = req.body;

        // EF 5: Si el frontend envía una foto (por ejemplo, en formato base64 en el campo 'foto')
        if (datosIncidente.foto) {
            // Subimos la foto a la nube de Cloudinary
            const urlNube = await uploadService.subirImagen(datosIncidente.foto);
            
            // Asignamos la URL devuelta al campo que MySQL entiende
            datosIncidente.evidencia_url = urlNube;
            
            // Eliminamos el campo 'foto' pesado para no enviarlo a la BD
            delete datosIncidente.foto;
        }

        // Continuamos con el flujo normal de la Arquitectura Limpia
        const result = await crearIncidenteUseCase(sequelizeIncidentesRepository, datosIncidente);
        res.status(201).json({ mensaje: 'El incidente fue reportado con éxito', data: result });
        
    } catch (error: any) { 
        res.status(400).json({ 
            mensaje: 'No pudimos registrar el incidente.', 
            error: error.message 
        }); 
    }
};

export const obtenerIncidentes = async (req: Request, res: Response) => {
    try {
        // Capturamos los parámetros de la URL (Por defecto: pág 1, límite 10)
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await obtenerIncidentesUseCase(sequelizeIncidentesRepository, limit, offset);

        res.status(200).json({
            mensaje: 'Incidentes cargados exitosamente',
            paginacion: {
                total_registros: count,
                total_paginas: Math.ceil(count / limit),
                pagina_actual: page,
                registros_por_pagina: limit
            },
            data: rows
        });
    } catch (error: any) { 
        res.status(500).json({ mensaje: 'Hubo un problema interno al intentar cargar los incidentes' }); 
    }
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
