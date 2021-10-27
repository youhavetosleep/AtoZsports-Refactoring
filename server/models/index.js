'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/*
db.User = require('./user')(sequelize, Sequelize)
db.Chat = require('./chat')(sequelize, Sequelize)
db.EplMatch = require('./eplmatch')(sequelize, Sequelize)
db.EplResult = require('./eplresult')(sequelize, Sequelize)
db.FavoritePost = require('./favoritepost')(sequelize, Sequelize)
db.Ground = require('./ground')(sequelize, Sequelize)
db.GroundReview = require('./groundreview')(sequelize, Sequelize)
db.Post = require('./chat')(sequelize, Sequelize)
*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
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
