module.exports = (sequelize, DataTypes) => {
  const FavoritePost = sequelize.define(
    'FavoritePost',
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
      tableName: 'FavoritePost',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  FavoritePost.associate = (db) => {
    db.FavoritePost.belongsTo(db.User, { foreignKey: 'userId' })
    db.FavoritePost.belongsTo(db.Post, { foreignKey: 'postId' })
  }

  return FavoritePost
}