'use strict'

const grounds = require('../data/ground')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    grounds.map((el) => {
      const {
        sports,
        placeName,
        addressName,
        roadAddressName,
        phone,
        longitude,
        latitude,
        placeUrl
      } = el
      let obj = {
        sports,
        placeName,
        addressName,
        roadAddressName,
        phone,
        longitude,
        latitude,
        placeUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('Ground', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ground', null, {})
  }
}
