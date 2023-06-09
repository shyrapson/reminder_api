const dbConfig = require('../config/db.config.js');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.reminder = require('./reminder.model.js')(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log('re-sync done!');
});

module.exports = db;
