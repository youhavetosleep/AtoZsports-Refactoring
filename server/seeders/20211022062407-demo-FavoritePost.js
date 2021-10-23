'use strict'

const favoritePost = require('../data/favoritePost')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    favoritePost.map((el) => {
      const {
        userId,
        postId
      } = el
      let obj = {
        userId,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('FavoritePost', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FavoritePost', null, {})
  }
}
