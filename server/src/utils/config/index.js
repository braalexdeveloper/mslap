require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'brayan',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5433,
  dbName: process.env.DB_NAME || 'mslap',
}