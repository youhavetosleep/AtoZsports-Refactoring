'use strict'

const eplMatch = require('../data/match')['matches']

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    eplMatch.map((el) => {
      let obj = {
        time: el.when,
        homeTeam: el.team1.teamName,
        awayTeam: el.team2.teamName,
        stadium: el.venue,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('EplMatch', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EplMatch', null, {})
  }
}
