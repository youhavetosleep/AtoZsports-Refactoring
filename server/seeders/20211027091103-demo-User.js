'use strict'

const users = require('../data/user')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    users.map((el) => {
      const {
        email,
        nickname,
        password,
        userPhone,
        homeground,
        favoriteSports,
        verified,
        verifiedKey
      } = el
      let encryptedPassword = bcrypt.hashSync(password, 10)
      let obj = {
        email,
        nickname,
        password: encryptedPassword,
        userPhone,
        homeground,
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
