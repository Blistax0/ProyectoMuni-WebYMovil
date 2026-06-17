"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../../core/database/database");
const Incidente = database_1.sequelize.define('Incidente', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo_incidente: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    nivel_gravedad: { type: sequelize_1.DataTypes.ENUM('ALTA', 'MEDIA', 'BAJA'), allowNull: false },
    latitud: { type: sequelize_1.DataTypes.DECIMAL(10, 8), allowNull: false },
    longitud: { type: sequelize_1.DataTypes.DECIMAL(11, 8), allowNull: false },
    descripcion: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    evidencia_url: { type: sequelize_1.DataTypes.STRING, allowNull: true }, // Para guardar el link de la foto
    estado_resolucion: { type: sequelize_1.DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'RESUELTO'), defaultValue: 'PENDIENTE' }
}, {
    tableName: 'incidentes',
    timestamps: true,
    indexes: [
        { fields: ['estado_resolucion'] }, // Optimiza cuando filtren por "PENDIENTES"
        { fields: ['createdAt'] } // Optimiza el ordenamiento por fecha
    ]
});
exports.default = Incidente;
