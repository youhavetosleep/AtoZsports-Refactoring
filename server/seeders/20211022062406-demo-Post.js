'use strict'

const posts = require('../data/post')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    posts.map((el) => {
      const {
        title,
        division,
        startTime,
        endTime,
        status,
        phoneOpen,
        userId,
        groundId
      } = el
      let obj = {
        title,
        division,
        startTime,
        endTime,
        status,
        phoneOpen,
        userId,
        groundId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('Post', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Post', null, {})
  }
}
