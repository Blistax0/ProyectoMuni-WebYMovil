const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Para leer variables secretas

// Inicializar la aplicación
const app = express();

// Middlewares básicos
app.use(cors()); // Permite que tu frontend de React se comunique con este backend
app.use(express.json()); // Permite leer la información que llegue en formato JSON

// Endpoint de prueba (Ruta raíz)
app.get('/', (req, res) => {
    res.json({ mensaje: '¡El servidor backend del SIGEP está funcionando correctamente!' });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});