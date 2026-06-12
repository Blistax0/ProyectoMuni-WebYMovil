import { Request, Response, NextFunction } from 'express';
import Geocerca from '../../../features/geocercas/data/Geocerca';

const crearGeocerca = async (req: Request, res: Response) => {
    try {
        const nuevaGeocerca = await Geocerca.create(req.body);
        res.status(201).json({ mensaje: 'Zona de vigilancia creada', data: nuevaGeocerca });
    } catch (error: any) {
        res.status(400).json({ mensaje: 'Error al crear geocerca', error: error.message });
    }
};

const obtenerGeocercas = async (req: Request, res: Response) => {
    try {
        const geocercas = await Geocerca.findAll({ where: { activa: true } });
        res.status(200).json(geocercas);
    } catch (error: any) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

const eliminarGeocerca = async (req: Request, res: Response) => {
    try {
        const geocerca = await Geocerca.findByPk(req.params.id as string);
        if (!geocerca) return res.status(404).json({ mensaje: 'Geocerca no encontrada' });
        
        (geocerca as any).activa = false; // Borrado lógico para no perder el historial
        await geocerca.save();
        res.status(200).json({ mensaje: 'Geocerca desactivada' });
    } catch (error: any) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

export { crearGeocerca, obtenerGeocercas, eliminarGeocerca  };