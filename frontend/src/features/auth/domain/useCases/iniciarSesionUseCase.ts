
import { AuthRepository } from '../repositories/AuthRepository';
export const iniciarSesionUseCase = async (repository: AuthRepository, correo: string, password: string) => {
    return await repository.login(correo, password);
};
