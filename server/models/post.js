module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sports: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      addressName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'Post',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  Post.associate = (db) => {
    db.Post.hasMany(db.Chat, { foreignKey: 'postId' })
      db.Post.hasMany(db.FavoritePost, { foreignKey: 'postId' })
      db.Post.belongsTo(db.User, { foreignKey: 'userId' })
      db.Post.belongsTo(db.Ground, { foreignKey: 'groundId' })
  }

  return Post
}