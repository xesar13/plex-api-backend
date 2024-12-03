const plexService = require('../services/plexService');
class PlexController {

    async getLibrariesController(req, res) {
        try {
            const libraries = await plexService.getLibraries();
            res.json(libraries);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las bibliotecas', error });
        }
    }

    async getMediaInfoMetadataController(req, res) {
        const { id } = req.params;
        try {
            const mediaInfo = await plexService.getMediaInfoMetadata(id);
            res.json(mediaInfo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información del medio', error });
        }
    }
    
    async getMediaInfoVideoController(req, res) {
        const { id } = req.params;
        try {
            const mediaInfo = await plexService.getMediaInfoVideo(id);
            res.json(mediaInfo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información del medio', error });
        }
    }

    async playMediaController(req, res) {
        const { id } = req.params;
        try {
             await plexService.playVideoPartService(id,res,req);
            
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información del medio', error });
        }
    }
    async getAvailablePlayersController(req, res) {
        try {
            const playersInfo = await plexService.getAvailablePlayers();
            res.json(playersInfo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información del medio', error });
        }
    }

    async authenticateController(req, res) {
        const { email, password } = req.body;
        try {
            const token = await plexService.authenticate(email, password);
            res.json(token);
        } catch (error) {
            res.status(500).json({ message: 'Error al autenticar', error });
        }
    }
}
module.exports = new PlexController();