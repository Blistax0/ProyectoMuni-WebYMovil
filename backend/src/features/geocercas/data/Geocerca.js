const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../core/database/database');

const Geocerca = sequelize.define('Geocerca', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_zona: { type: DataTypes.STRING, allowNull: false },
    // Usamos tipo JSON para guardar el arreglo de coordenadas [lat, lng] del polígono
    coordenadas_poligono: { type: DataTypes.JSON, allowNull: false },
    color_borde: { type: DataTypes.STRING, defaultValue: '#FF0000' },
    activa: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'geocercas',
    timestamps: true
});

module.exports = Geocerca;