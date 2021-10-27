module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      userPhone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      homeground: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      favoriteSports: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      verifiedKey: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'User',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  User.associate = (db) => {
    db.User.hasMany(db.Chat, { foreignKey: 'userId' })
    db.User.hasMany(db.FavoritePost, { foreignKey: 'userId' })
    db.User.hasMany(db.GroundReview, { foreignKey: 'userId' })
    db.User.hasMany(db.Post, { foreignKey: 'userId' })
  }

  return User
}