'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      homeground: {
        allowNull: false,
        type: Sequelize.STRING
      },
      favoriteSports: {
        allowNull: false,
        type: Sequelize.STRING
      },
      verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      verifiedKey: {
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User')
  }
}
