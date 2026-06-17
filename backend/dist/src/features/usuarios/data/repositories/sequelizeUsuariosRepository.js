"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeUsuariosRepository = void 0;
const Usuario_1 = __importDefault(require("../Usuario"));
exports.sequelizeUsuariosRepository = {
    crear: async (datos) => await Usuario_1.default.create(datos),
    obtenerTodos: async () => await Usuario_1.default.findAll({ where: { estado: true }, attributes: { exclude: ['password_hash'] } }),
    obtenerPorId: async (id) => await Usuario_1.default.findByPk(id, { attributes: { exclude: ['password_hash'] } }),
    actualizar: async (id, datos) => {
        const u = await Usuario_1.default.findByPk(id);
        if (!u)
            return null;
        await u.update(datos);
        return u;
    },
    desactivar: async (id) => {
        const u = await Usuario_1.default.findByPk(id);
        if (u) {
            u.estado = false;
            await u.save();
        }
    }
};
