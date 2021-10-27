const router = require('express').Router()
const homeController = require('../controllers/homeController')

router.get('/', homeController.main)
router.post('/signup', homeController.signup)
router.post('/signin', homeController.signin)
router.post('/mail-check', homeController.mailCheck)
router.post('/nick-check',homeController.nickCheck)

module.exports = router