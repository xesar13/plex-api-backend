// plex-api-backend/src/routes/plexRoutes.js

const express = require('express');
const plexController = require('../controllers/plexController');

const router = express.Router();

    router.get('/libraries', plexController.getLibrariesController.bind(plexController));
    router.get('/mediametadata/:id', plexController.getMediaInfoMetadataController.bind(plexController));
    router.get('/mediavideo/:id', plexController.getMediaInfoVideoController.bind(plexController));

    router.post('/authenticate', plexController.authenticateController.bind(plexController));
    router.get('/getplayersinfo', plexController.getAvailablePlayersController.bind(plexController));
    router.get('/playmedia/:id', plexController.playMediaController.bind(plexController));

    // Agrega más rutas según sea necesario



module.exports = router;