'use strict'

const review = require('../data/groundReview')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    review.map((el) => {
      const { comment, score, userId, groundId } = el
      let obj = {
        comment,
        score,
        userId,
        groundId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('GroundReview', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GroundReview', null, {})
  }
}
