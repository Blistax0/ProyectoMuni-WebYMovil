"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posicionController_1 = require("../../../features/posiciones/presentation/posicionController");
router.post('/', posicionController_1.guardarPosicion);
router.get('/', posicionController_1.obtenerHistorial);
exports.default = router;
