import { DataTypes  } from 'sequelize';
import { sequelize  } from '../../../core/database/database'; 
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('Usuario', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    rut: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    },
    nombre_completo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    correo: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    },
    telefono: { 
        type: DataTypes.STRING, 
        allowNull: true // Lo dejamos en true por si alguien no tiene, o false si es obligatorio
    },
    region: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    comuna: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    password_hash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    rol: { 
        type: DataTypes.ENUM('ADMIN', 'PATRULLERO'), 
        defaultValue: 'PATRULLERO' 
    },
    estado: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
}, {
    tableName: 'usuarios', 
    timestamps: true,
    hooks: {
        beforeCreate: async (usuario: any) => {
            if (usuario.password_hash) {
                const salt = await bcrypt.genSalt(10);
                usuario.password_hash = await bcrypt.hash(usuario.password_hash, salt);
            }
        },
        beforeUpdate: async (usuario: any) => {
            if (usuario.changed('password_hash')) {
                const salt = await bcrypt.genSalt(10);
                usuario.password_hash = await bcrypt.hash(usuario.password_hash, salt);
            }
        }
    }
});

export default Usuario;