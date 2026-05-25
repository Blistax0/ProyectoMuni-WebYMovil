const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');
// MODELOS
const Usuario = require('./models/Usuario');
const Geocerca = require('./models/Geocerca');
const Incidente = require('./models/Incidente');
const PosicionGPS = require('./models/PosicionGPS');

const app = express();
app.use(cors());
app.use(express.json());

// Probar conexión a la base de datos
testConnection(); 

// Definición de relaciones (llaves foráneas)

// 1. Un Usuario reporta muchos Incidentes
Usuario.hasMany(Incidente, { foreignKey: 'patrullero_id' });
Incidente.belongsTo(Usuario, { foreignKey: 'patrullero_id' });

// 2. Un Usuario genera muchas Posiciones GPS
Usuario.hasMany(PosicionGPS, { foreignKey: 'patrullero_id' });
PosicionGPS.belongsTo(Usuario, { foreignKey: 'patrullero_id' });


// Sincronizamos con MySQL (ORM)
sequelize.sync({ alter: true })
    .then(() => console.log('¡Tablas sincronizadas con la base de datos!'))
    .catch((err) => console.error('Error sincronizando tablas:', err));

app.get('/', (req, res) => {
    res.json({ mensaje: '¡El servidor backend del SIGEP está funcionando correctamente!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});