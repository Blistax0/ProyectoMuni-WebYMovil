"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const geocercaController_1 = require("../../../features/geocercas/presentation/geocercaController");
router.post('/', geocercaController_1.crearGeocerca);
router.get('/', geocercaController_1.obtenerGeocercas);
router.delete('/:id', geocercaController_1.eliminarGeocerca);
exports.default = router;
