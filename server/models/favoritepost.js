'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FavoritePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.FavoritePost.belongsTo(models.User)
      models.FavoritePost.belongsTo(models.Post)
    }
  }
  FavoritePost.init(
    {},
    {
      tableName: 'FavoritePost',
      sequelize,
      modelName: 'FavoritePost'
    }
  )
  return FavoritePost
}
