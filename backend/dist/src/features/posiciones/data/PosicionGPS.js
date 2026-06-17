"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../../core/database/database");
const PosicionGPS = database_1.sequelize.define('PosicionGPS', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    latitud: { type: sequelize_1.DataTypes.DECIMAL(10, 8), allowNull: false },
    longitud: { type: sequelize_1.DataTypes.DECIMAL(11, 8), allowNull: false },
    velocidad_kmh: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 }, // Para las alertas de exceso de velocidad
    patrullero_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'posiciones_gps',
    timestamps: true, // Nos dará la hora y minuto exacto en que pasó por ahí
    indexes: [
        { fields: ['patrullero_id'] }, // Acelera la búsqueda al filtrar por patrulla
        { fields: ['createdAt'] } // Acelera el ordenamiento del historial en el mapa
    ]
});
exports.default = PosicionGPS;
