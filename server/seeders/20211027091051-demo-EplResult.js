'use strict'

const eplMatch = require('../data/result')['matches']

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    eplMatch.map((el) => {
      let obj = {
        time: el.when,
        referee: el.referee,
        homeTeam: el.team1.teamName,
        homeScore: el.team1.teamScore,
        awayTeam: el.team2.teamName,
        awayScore: el.team2.teamScore,
        stadium: el.venue,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    })

    return queryInterface.bulkInsert('EplResult', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EplResult', null, {})
  }
}
