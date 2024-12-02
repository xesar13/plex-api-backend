require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');

class PlexService {
    constructor() {
        this.baseURL = process.env.PLEX_URL;
        this.token = null;
        if (!PlexService.instance) {
            PlexService.instance = this;
        }
        return PlexService.instance;
    }   

    async getLibraries() {
        try {
            const response = await axios.get(`${this.baseURL}/library/sections`,{
                headers: {
                    'X-Plex-Token': process.env.PLEX_TOKEN
                  }
            });
            if (!response.data.MediaContainer) {
                throw new Error('Error al obtener las bibliotecas');
            }
            const libraries = response.data.MediaContainer.Directory;
            return libraries;
        } catch (error) {
            res.json("Error fetching libraries:", error.message);
            //throw error;
        }
    }

    async getMediaInfoMetadata(libraryId) {
        try {
            const response = await axios.get(`${this.baseURL}/library/sections/${libraryId}/all`, {
                 params: { 'X-Plex-Token': process.env.PLEX_TOKEN } 
            });
            if (!response.data.MediaContainer) {
                throw new Error('Error al obtener las bibliotecas');
            }
            const items = response.data.MediaContainer.Metadata;
            return items;
        } catch (error) {
            res.json("Error fetching library items:", error.message);
            //throw error;
        }
    }

    async getMediaInfoVideo(libraryId) {
        try {
            const response = await axios.get(`${this.baseURL}/library/sections/${libraryId}/all`, {
                 params: { 'X-Plex-Token': process.env.PLEX_TOKEN } 
            });
            if (!response.data.MediaContainer) {
                throw new Error('Error al obtener las bibliotecas');
            }
            const items = response.data.MediaContainer.Video;
            return items;
        } catch (error) {
            res.json("Error fetching library items:", error.message);
            //throw error;
        }
    }

    async authenticate(email, password) {
        try {
            const response = await axios.post(`https://plex.tv/users/sign_in.json`,  {
                user: {
                login: email,
                password: password
                }
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-Plex-Client-Identifier': 'i9y571hhcynoubl6ybu7em7r',
                    'X-Plex-Product': 'Plex Server',
                    'X-Plex-Version': '4.318.0',
                    'X-Plex-Device': 'Roku',
                    'X-Plex-Platform': 'Linux'
                },
            });
            if (response.status !== 201) {
                throw new Error('Error de autenticación');
            }
            this.token = response.data.authToken;
            return response.data;
        } catch (error) {
            console.error('Error de autenticación:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    async playMediaService(ratingKey){
        try {
            const playbackUrl = `${this.baseURL}/player/playback/playMedia`;
        
            const params = {
            "X-Plex-Token": process.env.PLEX_TOKEN,
            "machineIdentifier": process.env.PLEX_PLAYER_MACHINE_IDENTIFIER,
            "key": `/library/metadata/${ratingKey}`,
            "type": "video",
            "offset": 0, // Start playback from the beginning
            };
        
            const playback = await axios.get(playbackUrl, { params });
            console.log("Playback initiated successfully!");

            return playback;
        } catch (error) {
            console.error("Error initiating playback:", error.message);
            throw error;
        }
    }

    async playVideoPartService(ratingKey){
        try {
            const response = `${this.baseURL}/library/parts/${ratingKey}/file?X-Plex-Token=${process.env.PLEX_TOKEN}`;
            console.log("Información de la parte:", response); // Información de la parte
             
            return response;
          } catch (error) {
            console.error("Error obteniendo la información de la parte:", error.message);
          }
    }

    async getMoviePartInfoService(ratingKey){
        try {
            const response = await axios.get(`${PLEX_SERVER_URL}/library/metadata/${ratingKey}/parts`, {
              params: { "X-Plex-Token": process.env.PLEX_TOKEN }
            });
            console.log("Información de la parte:", response.data); // Información de la parte
                // Obtener el enlace completo para la transmisión
            const videoParts = response.data.MediaContainer.Part || [];
            videoParts.forEach(part => {
            console.log("Parte del video:", part.file); // URL para acceder al archivo
            const partId = part.id;
            });
            return partId || [];
          } catch (error) {
            console.error("Error obteniendo la información de la parte:", error.message);
          }
    }

    async getAvailablePlayers() {
        try {
            const response = await axios.get(`${this.baseURL}/clients`, {
              params: { "X-Plex-Token": process.env.PLEX_TOKEN,"X-Plex-Device": "Streaming Stick 4K", "X-Plex-Platform": "Roku" },
            });
        
            if (response.data && response.data.MediaContainer && response.data.MediaContainer.Server) {
                const clients = response.data.MediaContainer.Server;
          
                // Mapea los clientes para extraer el machineIdentifier y más detalles
                const clientDetails = clients.map((client) => ({
                  name: client.name,
                  machineIdentifier: client.machineIdentifier,
                  address: client.host,
                  port: client.port,
                  version: client.version,
                }));
          
                console.log("Clientes conectados:", clientDetails);
                return clientDetails;
              } else {
                console.log("No se encontraron clientes conectados.");
                return [];
              }
          } catch (error) {
            console.error("Error fetching players:", error.message);
            throw error;
          }
    }
}

module.exports = new PlexService();