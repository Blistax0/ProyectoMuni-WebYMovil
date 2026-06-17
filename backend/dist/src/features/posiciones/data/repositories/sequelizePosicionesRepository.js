"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizePosicionesRepository = void 0;
const PosicionGPS_1 = __importDefault(require("../PosicionGPS"));
exports.sequelizePosicionesRepository = {
    guardar: async (datos) => await PosicionGPS_1.default.create(datos),
    obtenerHistorial: async (limit, offset) => {
        return await PosicionGPS_1.default.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Los registros más recientes primero
        });
    }
};
