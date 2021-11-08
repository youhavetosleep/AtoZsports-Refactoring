const router = require('express').Router()
const eplController = require('../controllers/eplController')

router.get('/match', eplController.match)
router.get('/result', eplController.result)

module.exports = router