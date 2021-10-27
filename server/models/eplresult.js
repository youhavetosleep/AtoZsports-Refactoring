module.exports = (sequelize, DataTypes) => {
  const EplResult = sequelize.define(
    'EplResult',
    {
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      referee: {
        type: DataTypes.STRING,
        allowNull: false
      },
      homeTeam: {
        type: DataTypes.STRING,
        allowNull: false
      },
      homeScore: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      awayScore: {
        type: DataTypes.STRING,
        allowNull: false
      },
      awayScore: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stadium: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'EplResult',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )
  return EplResult
}