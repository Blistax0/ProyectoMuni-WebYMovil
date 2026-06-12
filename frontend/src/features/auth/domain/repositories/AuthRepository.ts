
export interface AuthRepository {
    login(correo: string, password: string): Promise<any>;
    register(datos: any): Promise<any>;
}
