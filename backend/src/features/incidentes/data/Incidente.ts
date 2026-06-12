import { DataTypes  } from 'sequelize';
import { sequelize  } from '../../../core/database/database';

const Incidente = sequelize.define('Incidente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo_incidente: { type: DataTypes.STRING, allowNull: false },
    nivel_gravedad: { type: DataTypes.ENUM('ALTA', 'MEDIA', 'BAJA'), allowNull: false },
    latitud: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    longitud: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    evidencia_url: { type: DataTypes.STRING, allowNull: true }, // Para guardar el link de la foto
    estado_resolucion: { type: DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'RESUELTO'), defaultValue: 'PENDIENTE' }
}, {
    tableName: 'incidentes',
    timestamps: true 
});

export default Incidente;