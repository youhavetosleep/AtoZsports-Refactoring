'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EplResult', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      referee: {
        type: Sequelize.STRING
      },
      homeTeam: {
        type: Sequelize.STRING
      },
      homeScore: {
        type: Sequelize.FLOAT
      },
      awayTeam: {
        type: Sequelize.STRING
      },
      awayScore: {
        type: Sequelize.FLOAT
      },
      stadium: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EplResult');
  }
};