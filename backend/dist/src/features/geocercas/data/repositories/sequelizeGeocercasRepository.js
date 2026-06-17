"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeGeocercasRepository = void 0;
const Geocerca_1 = __importDefault(require("../Geocerca"));
exports.sequelizeGeocercasRepository = {
    crear: async (datos) => await Geocerca_1.default.create(datos),
    obtenerActivas: async () => await Geocerca_1.default.findAll({ where: { activa: true } }),
    obtenerPorId: async (id) => await Geocerca_1.default.findByPk(id),
    desactivar: async (id) => {
        const g = await Geocerca_1.default.findByPk(id);
        if (g) {
            g.activa = false;
            await g.save();
        }
    }
};
