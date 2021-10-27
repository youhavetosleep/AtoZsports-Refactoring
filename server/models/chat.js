module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      tableName: 'Chat',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  Chat.associate = (db) => {
    db.Chat.belongsTo(db.User, { foreignKey: 'userId' })
    db.Chat.belongsTo(db.Post, { foreignKey: 'postId' })
  }

  return Chat
}