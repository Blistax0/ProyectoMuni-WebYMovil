
import { IncidentesRepository } from '../../domain/repositories/IncidentesRepository';
import Incidente from '../Incidente';

export const sequelizeIncidentesRepository: IncidentesRepository = {
    crear: async (datos: any) => await Incidente.create(datos),
    obtenerTodos: async () => await Incidente.findAll(),
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
