module.exports = (sequelize, DataTypes) => {
  const EplMatch = sequelize.define(
    'EplMatch',
    {
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      homeTeam: {
        type: DataTypes.STRING,
        allowNull: false
      },
      awayTeam: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stadium: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'EplMatch',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )
  return EplMatch
}