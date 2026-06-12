import { Request, Response, NextFunction } from 'express';
import Incidente from '../../../features/incidentes/data/Incidente';

// Registramos un nuevo incidente reportado por un patrullero
const crearIncidente = async (req: Request, res: Response) => {
    try {
        const nuevoIncidente = await Incidente.create(req.body);
        res.status(201).json({ mensaje: 'El incidente fue reportado con éxito', data: nuevoIncidente });
    } catch (error: any) {
        console.error('Error al reportar incidente:', error);
        res.status(400).json({ mensaje: 'No pudimos registrar el incidente. Revisa los datos enviados.' });
    }
};

// Obtenemos todos los incidentes registrados en el sistema
const obtenerIncidentes = async (req: Request, res: Response) => {
    try {
        const incidentes = await Incidente.findAll();
        res.status(200).json(incidentes);
    } catch (error: any) {
        console.error('Error al obtener incidentes:', error);
        res.status(500).json({ mensaje: 'Hubo un problema interno al intentar cargar los incidentes' });
    }
};

// Actualizamos el estado de resolución de un incidente (ej: de Pendiente a Resuelto)
const actualizarEstadoIncidente = async (req: Request, res: Response) => {
    try {
        const incidente = await Incidente.findByPk(req.params.id as string);
        if (!incidente) return res.status(404).json({ mensaje: 'No encontramos el incidente solicitado' });
        
        (incidente as any).estado_resolucion = req.body.estado_resolucion;
        await incidente.save();
        
        res.status(200).json({ mensaje: 'El estado del incidente ha sido actualizado', data: incidente });
    } catch (error: any) {
        console.error('Error al actualizar incidente:', error);
        res.status(400).json({ mensaje: 'No pudimos actualizar el estado. Verifica que el estado enviado sea correcto.' });
    }
};

// Eliminamos un incidente del registro histórico
const eliminarIncidente = async (req: Request, res: Response) => {
    try {
        const incidente = await Incidente.findByPk(req.params.id as string);
        if (!incidente) return res.status(404).json({ mensaje: 'El incidente no existe o ya fue eliminado' });
        
        // Aquí sí usamos borrado físico para limpiar los registros irrelevantes o erróneos
        await incidente.destroy();
        res.status(200).json({ mensaje: 'Incidente eliminado exitosamente del registro' });
    } catch (error: any) {
        console.error('Error al eliminar incidente:', error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al intentar borrar el incidente' });
    }
};

export { crearIncidente, obtenerIncidentes, actualizarEstadoIncidente, eliminarIncidente  };