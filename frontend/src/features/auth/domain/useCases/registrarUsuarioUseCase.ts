
import { AuthRepository } from '../repositories/AuthRepository';
export const registrarUsuarioUseCase = async (repository: AuthRepository, datos: any) => {
    return await repository.register(datos);
};
