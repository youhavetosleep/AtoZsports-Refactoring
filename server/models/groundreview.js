module.exports = (sequelize, DataTypes) => {
  const GroundReview = sequelize.define(
    'GroundReview',
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
      tableName: 'GroundReview',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  GroundReview.associate = (db) => {
    db.GroundReview.belongsTo(db.User, { foreignKey: 'userId' })
    db.GroundReview.belongsTo(db.Ground, { foreignKey: 'groundId' })
  }

  return GroundReview
}