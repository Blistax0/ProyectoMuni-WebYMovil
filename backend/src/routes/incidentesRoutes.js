const express = require('express');
const router = express.Router();
const { crearIncidente, obtenerIncidentes, actualizarEstadoIncidente, eliminarIncidente } = require('../controllers/incidenteController');

router.post('/', crearIncidente);
router.get('/', obtenerIncidentes);
router.put('/:id', actualizarEstadoIncidente);
router.delete('/:id', eliminarIncidente);

module.exports = router;