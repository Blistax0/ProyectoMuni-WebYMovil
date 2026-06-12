import { Sequelize  } from 'sequelize';
require('dotenv').config();

// Inicializar la conexión (Sequelize)
const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: 'mysql',
        logging: false, // poner "true" para ver las consultas SQL en consola
    }
);

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('¡Conexión a la base de datos MySQL establecida con éxito!');
    } catch (error: any) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

export { sequelize, testConnection  };