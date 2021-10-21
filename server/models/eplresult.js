'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EplResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EplResult.init({
    time: DataTypes.STRING,
    referee: DataTypes.STRING,
    homeTeam: DataTypes.STRING,
    homeScore: DataTypes.FLOAT,
    awayTeam: DataTypes.STRING,
    awayScore: DataTypes.FLOAT,
    stadium: DataTypes.STRING
  }, {
    tableName: 'EplResult',
    sequelize,
    modelName: 'EplResult',
  });
  return EplResult;
};