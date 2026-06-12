
import { PosicionesRepository } from '../../domain/repositories/PosicionesRepository';
import PosicionGPS from '../PosicionGPS';

export const sequelizePosicionesRepository: PosicionesRepository = {
    guardar: async (datos: any) => await PosicionGPS.create(datos),
    obtenerHistorial: async () => await PosicionGPS.findAll()
};
