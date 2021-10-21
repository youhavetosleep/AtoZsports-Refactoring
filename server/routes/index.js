const router = require('express').Router()
const {  } = require('../models')

router.get('/users', (req, res) => {
  User.findAll({})
    .then(data => {
      if(!data) res.send('no data')
      res.send(data)
    })
    .catch(err => {
      console.log(err.message)
    })
})

router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router