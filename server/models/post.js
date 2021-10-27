'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.hasMany(models.Chat, { foreignKey: 'postId' })
      models.Post.hasMany(models.FavoritePost, { foreignKey: 'postId' })
      models.Post.belongsTo(models.User, { foreignKey: 'userId' })
      models.Post.belongsTo(models.Ground, { foreignKey: 'groundId' })
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      sports: DataTypes.STRING,
      division: DataTypes.STRING,
      content: DataTypes.TEXT,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      status: DataTypes.STRING,
      phoneOpen: DataTypes.BOOLEAN,
      addressName: DataTypes.STRING
    },
    {
      tableName: 'Post',
      sequelize,
      modelName: 'Post'
    }
  )
  return Post
}
