import express from 'express';
const router = express.Router();
import { guardarPosicion, obtenerHistorial  } from '../../../features/posiciones/presentation/posicionController';

router.post('/', guardarPosicion);
router.get('/', obtenerHistorial);

export default router;