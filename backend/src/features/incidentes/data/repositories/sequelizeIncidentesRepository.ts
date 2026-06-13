
import { IncidentesRepository } from '../../domain/repositories/IncidentesRepository';
import Incidente from '../Incidente';

export const sequelizeIncidentesRepository: IncidentesRepository = {
    crear: async (datos: any) => await Incidente.create(datos),
    
    obtenerTodos: async (limit: number, offset: number) => {
        return await Incidente.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Para que el admin vea primero los más urgentes/recientes
        });
    },
    
    obtenerPorId: async (id: string) => await Incidente.findByPk(id),
    
    actualizarEstado: async (id: string, estado: string) => {
        const inc = await Incidente.findByPk(id);
        if (!inc) return null;
        (inc as any).estado_resolucion = estado;
        await inc.save();
        return inc;
    },
    
    eliminarFisicamente: async (id: string) => {
        const inc = await Incidente.findByPk(id);
        if (inc) await inc.destroy();
    }
};
