const Geocerca = require('../models/Geocerca');

const crearGeocerca = async (req, res) => {
    try {
        const nuevaGeocerca = await Geocerca.create(req.body);
        res.status(201).json({ mensaje: 'Zona de vigilancia creada', data: nuevaGeocerca });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear geocerca', error: error.message });
    }
};

const obtenerGeocercas = async (req, res) => {
    try {
        const geocercas = await Geocerca.findAll({ where: { activa: true } });
        res.status(200).json(geocercas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

const eliminarGeocerca = async (req, res) => {
    try {
        const geocerca = await Geocerca.findByPk(req.params.id);
        if (!geocerca) return res.status(404).json({ mensaje: 'Geocerca no encontrada' });
        
        geocerca.activa = false; // Borrado lógico para no perder el historial
        await geocerca.save();
        res.status(200).json({ mensaje: 'Geocerca desactivada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

module.exports = { crearGeocerca, obtenerGeocercas, eliminarGeocerca };