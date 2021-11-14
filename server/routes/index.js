const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')
const usersRoutes = require('./usersRoutes')
const sportsRoutes =  require('./sportsRoutes')
const eplRoutes = require('./eplRoutes')

router.use('/users', usersRoutes)
router.use('/epl', eplRoutes)
router.use('/:sports', sportsRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router