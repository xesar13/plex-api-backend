module.exports = {
  apps: [
    {
      name: 'PlexAPI',
      script: './src/app.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PLEX_URL: process.env.PLEX_URL,
        PLEX_TOKEN: process.env.PLEX_TOKEN,
        PORT: 8013
      },
      env_production: {
        NODE_ENV: 'production',
        PLEX_URL: process.env.PLEX_URL,
        PLEX_TOKEN: process.env.PLEX_TOKEN,
        PORT: 8013
      },
    },
  ],
};