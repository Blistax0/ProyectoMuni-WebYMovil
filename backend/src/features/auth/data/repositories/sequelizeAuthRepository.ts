import { AuthRepository } from '../../domain/repositories/AuthRepository';
import Usuario from '../../../usuarios/data/Usuario';

export const sequelizeAuthRepository: AuthRepository = {
    buscarPorCorreo: async (correo: string) => {
        return await Usuario.findOne({ where: { correo } });
    }
};
