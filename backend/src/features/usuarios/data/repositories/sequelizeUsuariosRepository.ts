
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import Usuario from '../Usuario';

export const sequelizeUsuariosRepository: UsuariosRepository = {
    crear: async (datos: any) => await Usuario.create(datos),
    obtenerTodos: async () => await Usuario.findAll({ where: { estado: true }, attributes: { exclude: ['password_hash'] } }),
    obtenerPorId: async (id: string) => await Usuario.findByPk(id, { attributes: { exclude: ['password_hash'] } }),
    actualizar: async (id: string, datos: any) => {
        const u = await Usuario.findByPk(id);
        if (!u) return null;
        await u.update(datos);
        return u;
    },
    desactivar: async (id: string) => {
        const u = await Usuario.findByPk(id);
        if (u) {
            (u as any).estado = false;
            await u.save();
        }
    }
};
