import express from 'express';
import cors from 'cors';
require('dotenv').config();

import { sequelize, testConnection  } from './core/database/database';
// MODELOS
import Usuario from './features/usuarios/data/Usuario';
import Geocerca from './features/geocercas/data/Geocerca';
import Incidente from './features/incidentes/data/Incidente';
import PosicionGPS from './features/posiciones/data/PosicionGPS';

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
import rutasUsuarios from './features/usuarios/presentation/usuariosRoutes';
import rutasIncidentes from './features/incidentes/presentation/incidentesRoutes';
import rutasGeocercas from './features/geocercas/presentation/geocercasRoutes'; 
import rutasPosiciones from './features/posiciones/presentation/posicionesRoutes';
import rutasAuth from './features/auth/presentation/authRoutes';

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