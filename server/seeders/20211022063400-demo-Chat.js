'use strict'

const chat = require('../data/chat')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    chat.map((el) => {
      const {
        comment,
        userId,
        postId
      } = el
      let obj = {
        comment,
        userId,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('Chat', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chat', null, {})
  }
}
