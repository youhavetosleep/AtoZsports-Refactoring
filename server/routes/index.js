const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')
const usersRoutes = require('./usersRoutes')
const sportsRoutes =  require('./sportsRoutes')

router.use('/users', usersRoutes)
router.use('/:sports', sportsRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router