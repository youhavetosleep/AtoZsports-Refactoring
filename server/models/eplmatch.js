'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EplMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EplMatch.init({
    time: DataTypes.STRING,
    homeTeam: DataTypes.STRING,
    awayTeam: DataTypes.STRING,
    stadium: DataTypes.STRING
  }, {
    tableName: 'EplMatch',
    sequelize,
    modelName: 'EplMatch',
  });
  return EplMatch;
};