
export interface PosicionesRepository {
    guardar(datos: any): Promise<any>;
    obtenerHistorial(limit: number, offset: number): Promise<{ count: number, rows: any[] }>;
}