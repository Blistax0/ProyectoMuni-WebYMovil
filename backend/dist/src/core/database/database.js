"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
// Inicializar la conexión (Sequelize)
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // poner "true" para ver las consultas SQL en consola
});
exports.sequelize = sequelize;
// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('¡Conexión a la base de datos MySQL establecida con éxito!');
    }
    catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};
exports.testConnection = testConnection;
