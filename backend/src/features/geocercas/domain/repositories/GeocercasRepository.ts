
export interface GeocercasRepository {
    crear(datos: any): Promise<any>;
    obtenerActivas(): Promise<any[]>;
    obtenerPorId(id: string): Promise<any>;
    desactivar(id: string): Promise<void>;
}
