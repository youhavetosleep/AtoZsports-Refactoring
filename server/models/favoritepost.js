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
      models.FavoritePost.belongsTo(models.User, { foreignKey: 'userId' })
      models.FavoritePost.belongsTo(models.Post, { foreignKey: 'postId' })
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
