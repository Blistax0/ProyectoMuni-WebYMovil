"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeIncidentesRepository = void 0;
const Incidente_1 = __importDefault(require("../Incidente"));
exports.sequelizeIncidentesRepository = {
    crear: async (datos) => await Incidente_1.default.create(datos),
    obtenerTodos: async (limit, offset) => {
        return await Incidente_1.default.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Para que el admin vea primero los más urgentes/recientes
        });
    },
    obtenerPorId: async (id) => await Incidente_1.default.findByPk(id),
    actualizarEstado: async (id, estado) => {
        const inc = await Incidente_1.default.findByPk(id);
        if (!inc)
            return null;
        inc.estado_resolucion = estado;
        await inc.save();
        return inc;
    },
    eliminarFisicamente: async (id) => {
        const inc = await Incidente_1.default.findByPk(id);
        if (inc)
            await inc.destroy();
    }
};
