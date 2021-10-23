'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroundReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.GroundReview.belongsTo(models.User)
      models.GroundReview.belongsTo(models.Ground)
    }
  };
  GroundReview.init({
    comment: DataTypes.TEXT,
    score: DataTypes.FLOAT
  }, {
    tableName: 'GroundReview',
    sequelize,
    modelName: 'GroundReview',
  });
  return GroundReview;
};