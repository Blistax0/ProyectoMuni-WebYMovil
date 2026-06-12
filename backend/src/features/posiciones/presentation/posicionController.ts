import PosicionGPS from '../../../features/posiciones/data/PosicionGPS';

// POST: Guardar una nueva coordenada enviada por el celular del patrullero
const guardarPosicion = async (req, res) => {
    try {
        const nuevaPosicion = await PosicionGPS.create(req.body);
        res.status(201).json({ mensaje: 'Coordenada GPS guardada', data: nuevaPosicion });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar posición', error: error.message });
    }
};

// GET: Obtener el historial completo para dibujarlo en el mapa
const obtenerHistorial = async (req, res) => {
    try {
        const historial = await PosicionGPS.findAll();
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

module.exports = { guardarPosicion, obtenerHistorial };