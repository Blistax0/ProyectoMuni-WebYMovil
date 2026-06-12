import express from 'express';
const router = express.Router();
import { crearGeocerca, obtenerGeocercas, eliminarGeocerca  } from '../../../features/geocercas/presentation/geocercaController';

router.post('/', crearGeocerca);
router.get('/', obtenerGeocercas);
router.delete('/:id', eliminarGeocerca);

export default router;