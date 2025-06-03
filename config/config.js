require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  gameApiUrl: process.env.GAME_API_URL || 'https://api.example.com/games',
  gameApiKey: process.env.GAME_API_KEY || 'your_api_key',
  db: {
    name: process.env.DB_NAME || 'gamecollect',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
};