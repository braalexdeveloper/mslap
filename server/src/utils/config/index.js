require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || 'consulfinhn_tech',
  dbPassword: process.env.DB_PASSWORD || 'consulfinhntech',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5433,
  dbName: process.env.DB_NAME || 'consulfinhn_mslap',
  email: process.env.EMAIL_NODEMAILER || 'admon.mslaps@gmail.com',
  password: process.env.PASSWORD || 'fnicolalde.mslaps',
}