const { EplResult, EplMatch } = require('../models')

module.exports = {
  match: (req, res, next) => {
    EplMatch.findAll({})
      .then((data) => {
        const filterData = data.map((el) => {
          const { id, time, homeTeam, awayTeam, stadium } = el
          return { id, time, homeTeam, awayTeam, stadium }
        })
        res.send(filterData)
      })
      .catch((err) => {
        console.log(`EplMatch Error: ${err.message}`)
        next(err)
      })
  },
  result: (req, res, next) => {
    EplResult.findAll({})
      .then((data) => {
        const filterData = data.map((el) => {
          const {
            id,
            time,
            homeTeam,
            homeScore,
            awayTeam,
            awayScore,
            stadium
          } = el
          return { id, time, homeTeam, homeScore, awayTeam, awayScore, stadium }
        })
        res.send(filterData)
      })
      .catch((err) => {
        console.log(`EplResult Error: ${err.message}`)
        next(err)
      })
  }
}
