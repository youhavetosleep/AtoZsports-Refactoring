module.exports = (sequelize, DataTypes) => {
  const Ground = sequelize.define(
    'Ground',
    {
      sports: {
        type: DataTypes.STRING,
        allowNull: false
      },
      placeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      addressName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      placeUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'Ground',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  Ground.associate = (db) => {
    db.Ground.hasMany(db.Post, { foreignKey: 'groundId' })
    db.Ground.hasMany(db.GroundReview, { foreignKey: 'groundId' })
  }

  return Ground
}
