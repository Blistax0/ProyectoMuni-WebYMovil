
import API from '../../../../core/config/axios';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export const axiosAuthRepository: AuthRepository = {
    login: async (correo: string, password: string) => {
        const response = await API.post('/auth/login', { correo, password });
        return response.data;
    },
    register: async (datos: any) => {
        const response = await API.post('/auth/register', datos);
        return response.data;
    }
};
