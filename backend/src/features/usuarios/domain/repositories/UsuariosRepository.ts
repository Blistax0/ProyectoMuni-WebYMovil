
export interface UsuariosRepository {
    crear(datos: any): Promise<any>;
    obtenerTodos(): Promise<any[]>;
    obtenerPorId(id: string): Promise<any>;
    actualizar(id: string, datos: any): Promise<any>;
    desactivar(id: string): Promise<void>;
}
