const express = require('express');
const router = express.Router();
const { guardarPosicion, obtenerHistorial } = require('../../../features/posiciones/presentation/posicionController');

router.post('/', guardarPosicion);
router.get('/', obtenerHistorial);

module.exports = router;