
export interface PosicionesRepository {
    guardar(datos: any): Promise<any>;
    obtenerHistorial(): Promise<any[]>;
}
