import { PosicionesRepository } from '../../domain/repositories/PosicionesRepository';
import PosicionGPS from '../PosicionGPS';

export const sequelizePosicionesRepository: PosicionesRepository = {
    guardar: async (datos: any) => await PosicionGPS.create(datos),
    
    obtenerHistorial: async (limit: number, offset: number) => {
        return await PosicionGPS.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Los registros más recientes primero
        });
    }
};