"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const database_1 = require("./core/database/database");
// MODELOS
const Usuario_1 = __importDefault(require("./features/usuarios/data/Usuario"));
const Incidente_1 = __importDefault(require("./features/incidentes/data/Incidente"));
const PosicionGPS_1 = __importDefault(require("./features/posiciones/data/PosicionGPS"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Probar conexión a la base de datos
(0, database_1.testConnection)();
// Definición de relaciones (llaves foráneas)
// 1. Un Usuario reporta muchos Incidentes
Usuario_1.default.hasMany(Incidente_1.default, { foreignKey: 'patrullero_id' });
Incidente_1.default.belongsTo(Usuario_1.default, { foreignKey: 'patrullero_id' });
// 2. Un Usuario genera muchas Posiciones GPS
Usuario_1.default.hasMany(PosicionGPS_1.default, { foreignKey: 'patrullero_id' });
PosicionGPS_1.default.belongsTo(Usuario_1.default, { foreignKey: 'patrullero_id' });
// Sincronizamos con MySQL (ORM)
database_1.sequelize.sync({ alter: true })
    .then(() => console.log('¡Tablas sincronizadas con la base de datos!'))
    .catch((err) => console.error('Error sincronizando tablas:', err));
// Importar y usar rutas
const usuariosRoutes_1 = __importDefault(require("./features/usuarios/presentation/usuariosRoutes"));
const incidentesRoutes_1 = __importDefault(require("./features/incidentes/presentation/incidentesRoutes"));
const geocercasRoutes_1 = __importDefault(require("./features/geocercas/presentation/geocercasRoutes"));
const posicionesRoutes_1 = __importDefault(require("./features/posiciones/presentation/posicionesRoutes"));
const authRoutes_1 = __importDefault(require("./features/auth/presentation/authRoutes"));
app.use('/api/usuarios', usuariosRoutes_1.default);
app.use('/api/incidentes', incidentesRoutes_1.default);
app.use('/api/geocercas', geocercasRoutes_1.default);
app.use('/api/posiciones', posicionesRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ mensaje: '¡El servidor backend del SIGEP está funcionando correctamente!' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
