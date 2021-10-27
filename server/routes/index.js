const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')
const usersRoutes = require('./usersRoutes')
const sportsRoutes =  require('./sportsRoutes')
const testRoutes = require('./testRoutes')

router.use('/users', usersRoutes)
router.use('/test', testRoutes)
router.use('/futsal', sportsRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router