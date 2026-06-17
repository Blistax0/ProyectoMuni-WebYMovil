"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const incidenteController_1 = require("../../../features/incidentes/presentation/incidenteController");
router.post('/', incidenteController_1.crearIncidente);
router.get('/', incidenteController_1.obtenerIncidentes);
router.put('/:id', incidenteController_1.actualizarEstadoIncidente);
router.delete('/:id', incidenteController_1.eliminarIncidente);
exports.default = router;
