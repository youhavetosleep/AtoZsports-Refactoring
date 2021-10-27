const router = require('express').Router()

router.post('/', (req, res) => {
    res.send(`check! ${req.body.test}`)
})

module.exports = router