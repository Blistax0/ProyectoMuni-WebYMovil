import express from 'express';
const router = express.Router();
import { crearIncidente, obtenerIncidentes, actualizarEstadoIncidente, eliminarIncidente  } from '../../../features/incidentes/presentation/incidenteController';

router.post('/', crearIncidente);
router.get('/', obtenerIncidentes);
router.put('/:id', actualizarEstadoIncidente);
router.delete('/:id', eliminarIncidente);

export default router;