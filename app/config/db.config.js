const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: 'techinover_api',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
