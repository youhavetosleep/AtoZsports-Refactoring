'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Chat)
      models.User.hasMany(models.FavoritePost)
      models.User.hasMany(models.GroundReview)
      models.User.hasMany(models.Post)
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      homeground: DataTypes.STRING,
      favoriteSports: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      verifiedKey: DataTypes.STRING
    },
    {
      tableName: 'User',
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
