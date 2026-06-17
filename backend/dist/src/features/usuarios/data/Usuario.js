"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../../core/database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario = database_1.sequelize.define('Usuario', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true // Lo dejamos en true por si alguien no tiene, o false si es obligatorio
    },
    region: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    comuna: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM('ADMIN', 'PATRULLERO'),
        defaultValue: 'PATRULLERO'
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.password_hash) {
                const salt = await bcrypt_1.default.genSalt(10);
                usuario.password_hash = await bcrypt_1.default.hash(usuario.password_hash, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('password_hash')) {
                const salt = await bcrypt_1.default.genSalt(10);
                usuario.password_hash = await bcrypt_1.default.hash(usuario.password_hash, salt);
            }
        }
    }
});
exports.default = Usuario;
