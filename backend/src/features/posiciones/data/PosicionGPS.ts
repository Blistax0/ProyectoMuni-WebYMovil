import { DataTypes  } from 'sequelize';
import { sequelize  } from '../../../core/database/database';

const PosicionGPS = sequelize.define('PosicionGPS', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    latitud: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    longitud: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    velocidad_kmh: { type: DataTypes.FLOAT, defaultValue: 0 }, // Para las alertas de exceso de velocidad
    patrullero_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'posiciones_gps',
    timestamps: true, // Nos dará la hora y minuto exacto en que pasó por ahí
    indexes: [
        { fields: ['patrullero_id'] }, // Acelera la búsqueda al filtrar por patrulla
        { fields: ['createdAt'] } // Acelera el ordenamiento del historial en el mapa
    ]
});

export default PosicionGPS;