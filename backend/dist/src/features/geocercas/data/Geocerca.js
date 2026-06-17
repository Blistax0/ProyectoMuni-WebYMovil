"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../../core/database/database");
const Geocerca = database_1.sequelize.define('Geocerca', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_zona: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    // Usamos tipo JSON para guardar el arreglo de coordenadas [lat, lng] del polígono
    coordenadas_poligono: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    color_borde: { type: sequelize_1.DataTypes.STRING, defaultValue: '#FF0000' },
    activa: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'geocercas',
    timestamps: true
});
exports.default = Geocerca;
