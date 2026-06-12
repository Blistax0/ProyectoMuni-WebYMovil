
export interface IncidentesRepository {
    crear(datos: any): Promise<any>;
    obtenerTodos(): Promise<any[]>;
    obtenerPorId(id: string): Promise<any>;
    actualizarEstado(id: string, estado: string): Promise<any>;
    eliminarFisicamente(id: string): Promise<void>;
}
