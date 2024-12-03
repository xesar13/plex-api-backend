# Plex API Backend

Este proyecto es una API en Node.js que se conecta a la API del servidor Plex. Permite interactuar con las bibliotecas y medios disponibles en Plex, facilitando la obtención de información y la gestión de contenidos.

## Estructura del Proyecto

```
plex-api-backend
├── src
│   ├── app.js                  # Punto de entrada de la aplicación
│   ├── controllers
│   │   └── plexController.js   # Controlador para manejar solicitudes de Plex
│   ├── routes
│   │   └── plexRoutes.js       # Rutas de la API de Plex
│   └── services
│       └── plexService.js      # Servicio para interactuar con la API de Plex
├── ecosystem.config.js         # Configuración para PM2
├── package.json                # Configuración de npm y dependencias
├── .env                        # Variables de entorno
└── README.md                   # Documentación del proyecto
```

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- PM2 (para la gestión del proceso)

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd plex-api-backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura el archivo `.env` con la URL de tu servidor Plex y las credenciales necesarias.
```
PLEX_URL=http://URL_SERVER:32400
PLEX_TOKEN=TOKEN_PLEX
PORT=PORT_LOCAL_SERVER
```
## Ejecución

Para ejecutar la aplicación, utiliza PM2:

```
pm2 start ecosystem.config.js
```

## Rutas

- `GET /api/plex/libraries`: Obtiene información sobre las bibliotecas de Plex.
- `GET /api/plex/media/:id`: Obtiene información sobre un medio específico en Plex.
- `GET /api/plex/playmedia/:id`: Obtiene el video directo del servidor de Plex, debes obtener el ratingkey y colocarlo en ID.
- `GET /api/plex/authenticate`: Obtiene el token Plex.
```
   POST REQUEST:
   user: {
                login: email,
                password: password
         }
```
- `GET /api/plex/mediametadata/:id`: Está vinculada al método getMediaInfoMetadataController del plexController. Esta ruta se utiliza para obtener los metadatos de un medio específico, identificado por el parámetro id

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.