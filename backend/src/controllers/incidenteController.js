const Incidente = require('../models/Incidente');

const crearIncidente = async (req, res) => {
    try {
        const nuevoIncidente = await Incidente.create(req.body);
        res.status(201).json({ mensaje: 'Incidente reportado con éxito', data: nuevoIncidente });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al reportar incidente', error: error.message });
    }
};

const obtenerIncidentes = async (req, res) => {
    try {
        const incidentes = await Incidente.findAll();
        res.status(200).json(incidentes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error: error.message });
    }
};

const actualizarEstadoIncidente = async (req, res) => {
    try {
        const incidente = await Incidente.findByPk(req.params.id);
        if (!incidente) return res.status(404).json({ mensaje: 'Incidente no encontrado' });
        
        incidente.estado_resolucion = req.body.estado_resolucion;
        await incidente.save();
        
        res.status(200).json({ mensaje: 'Estado del incidente actualizado', data: incidente });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

const eliminarIncidente = async (req, res) => {
    try {
        const incidente = await Incidente.findByPk(req.params.id);
        if (!incidente) return res.status(404).json({ mensaje: 'Incidente no encontrado' });
        
        await incidente.destroy(); // Aquí sí usamos borrado físico (opcional según la regla de negocio)
        res.status(200).json({ mensaje: 'Incidente eliminado del registro' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

module.exports = { crearIncidente, obtenerIncidentes, actualizarEstadoIncidente, eliminarIncidente };