require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 3310,
  dbName: process.env.DB_NAME || 'mslap',
  email: process.env.EMAIL_NODEMAILER || "brayangenesis@gmail.com",
  password: process.env.PASSWORD || "zbkbazfutiwrgtcb",
}