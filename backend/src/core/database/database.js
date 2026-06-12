const { Sequelize } = require('sequelize');
require('dotenv').config();

// Inicializar la conexión (Sequelize)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // poner "true" para ver las consultas SQL en consola
    }
);

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('¡Conexión a la base de datos MySQL establecida con éxito!');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

module.exports = { sequelize, testConnection };