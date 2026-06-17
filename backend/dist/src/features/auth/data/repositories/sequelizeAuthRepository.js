"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeAuthRepository = void 0;
const Usuario_1 = __importDefault(require("../../../usuarios/data/Usuario"));
exports.sequelizeAuthRepository = {
    buscarPorCorreo: async (correo) => {
        return await Usuario_1.default.findOne({ where: { correo } });
    }
};
