export interface AuthRepository {
    buscarPorCorreo(correo: string): Promise<any>;
}
