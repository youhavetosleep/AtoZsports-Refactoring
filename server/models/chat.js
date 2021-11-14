'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Chat.belongsTo(models.User, { foreignKey: 'userId' })
      models.Chat.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Chat.init(
    {
      comment: DataTypes.TEXT
    },
    {
      tableName: 'Chat',
      sequelize,
      modelName: 'Chat'
    }
  )
  return Chat
}
