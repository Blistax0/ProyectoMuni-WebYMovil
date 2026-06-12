const express = require('express');
const router = express.Router();
const { crearGeocerca, obtenerGeocercas, eliminarGeocerca } = require('../../../features/geocercas/presentation/geocercaController');

router.post('/', crearGeocerca);
router.get('/', obtenerGeocercas);
router.delete('/:id', eliminarGeocerca);

module.exports = router;