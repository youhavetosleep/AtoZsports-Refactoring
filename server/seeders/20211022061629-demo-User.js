'use strict'

const users = require('../data/user')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    users.map((el) => {
      const {
        email,
        nickName,
        password,
        phone,
        homeGround,
        favoriteSports,
        verified,
        verifiedKey
      } = el
      let obj = {
        email,
        nickName,
        password,
        phone,
        homeGround,
        favoriteSports,
        verified,
        verifiedKey,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('User', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  }
}
