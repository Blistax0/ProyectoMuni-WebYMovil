const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testConnection } = require('./core/database/database');
// MODELOS
const Usuario = require('./features/usuarios/data/Usuario');
const Geocerca = require('./features/geocercas/data/Geocerca');
const Incidente = require('./features/incidentes/data/Incidente');
const PosicionGPS = require('./features/posiciones/data/PosicionGPS');

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

// Importar y usar rutas
const rutasUsuarios = require('./features/usuarios/presentation/usuariosRoutes');
const rutasIncidentes = require('./features/incidentes/presentation/incidentesRoutes');
const rutasGeocercas = require('./features/geocercas/presentation/geocercasRoutes'); 
const rutasPosiciones = require('./features/posiciones/presentation/posicionesRoutes');
const rutasAuth = require('./features/auth/presentation/authRoutes');

app.use('/api/usuarios', rutasUsuarios);
app.use('/api/incidentes', rutasIncidentes);
app.use('/api/geocercas', rutasGeocercas);
app.use('/api/posiciones', rutasPosiciones);
app.use('/api/auth', rutasAuth);

app.get('/', (req, res) => {
    res.json({ mensaje: '¡El servidor backend del SIGEP está funcionando correctamente!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});