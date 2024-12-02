const express = require('express');
const bodyParser = require('body-parser');
const plexRoutes = require('./routes/plexRoutes');
const axios = require('axios');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const plexService = require('./services/plexService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/plex', plexRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de Plex en funcionamiento');
});

// Ruta principal
app.get('/proxy/:id', async (req, res,next) => {
    const partId = req.params.id;

    // Construimos la URL del archivo en Plex
    const targetUrl = await plexService.playVideoPartService(partId);
    
    // Usamos el proxy para redirigir la solicitud al servidor Plex
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // Opcional: puedes personalizar los encabezados aquí si es necesario
        console.log(`Proxying request to: ${targetUrl}`);
        res.send(proxyReq);
      },
    })(req, res,next);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});