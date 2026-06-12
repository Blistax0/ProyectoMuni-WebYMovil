
import { GeocercasRepository } from '../../domain/repositories/GeocercasRepository';
import Geocerca from '../Geocerca';

export const sequelizeGeocercasRepository: GeocercasRepository = {
    crear: async (datos: any) => await Geocerca.create(datos),
    obtenerActivas: async () => await Geocerca.findAll({ where: { activa: true } }),
    obtenerPorId: async (id: string) => await Geocerca.findByPk(id),
    desactivar: async (id: string) => {
        const g = await Geocerca.findByPk(id);
        if (g) {
            (g as any).activa = false;
            await g.save();
        }
    }
};
