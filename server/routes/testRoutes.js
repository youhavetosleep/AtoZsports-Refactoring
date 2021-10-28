const router = require('express').Router()
const { Post } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({})
    .then((data) => res.send(data))
})

module.exports = router