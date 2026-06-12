const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../core/database/database');

const PosicionGPS = sequelize.define('PosicionGPS', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    latitud: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    longitud: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    velocidad_kmh: { type: DataTypes.FLOAT, defaultValue: 0 } // Para las alertas de exceso de velocidad
}, {
    tableName: 'posiciones_gps',
    timestamps: true // Esto nos dará la hora y minuto exacto en que pasó por ahí
});

module.exports = PosicionGPS;