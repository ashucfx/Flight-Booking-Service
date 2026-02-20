'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const serverConfig = require(__dirname + '/../config/server-config');
const db = {};

let sequelize;
// Use environment variables if available, otherwise fall back to config.json
if (serverConfig.DB_HOST && serverConfig.DB_USER && serverConfig.DB_NAME) {
  sequelize = new Sequelize(
    serverConfig.DB_NAME,
    serverConfig.DB_USER,
    serverConfig.DB_PASSWORD,
    {
      host: serverConfig.DB_HOST,
      port: serverConfig.DB_PORT,
      dialect: serverConfig.DB_DIALECT,
      logging: env === 'development' ? console.log : false
    }
  );
} else {
  // Fallback to config.json for backward compatibility
  const config = require(__dirname + '/../config/config.json')[env];
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
