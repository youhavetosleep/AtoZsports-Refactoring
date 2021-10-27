'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ground extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Ground.hasMany(models.Post, { foreignKey: 'groundId' })
      models.Ground.hasMany(models.GroundReview, { foreignKey: 'groundId' })
    }
  }
  Ground.init(
    {
      sports: DataTypes.STRING,
      placeName: DataTypes.STRING,
      addressName: DataTypes.STRING,
      phone: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      placeUrl: DataTypes.STRING
    },
    {
      tableName: 'Ground',
      sequelize,
      modelName: 'Ground'
    }
  )
  return Ground
}
