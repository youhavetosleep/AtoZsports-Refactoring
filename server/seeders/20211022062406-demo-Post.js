'use strict'

const posts = require('../data/post')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    posts.map((el) => {
      const {
        sports,
        title,
        division,
        content,
        startTime,
        endTime,
        status,
        phoneOpen,
        addressName,
        userId,
        groundId
      } = el
      let obj = {
        sports,
        title,
        division,
        content,
        startTime,
        endTime,
        status,
        phoneOpen,
        addressName,
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
