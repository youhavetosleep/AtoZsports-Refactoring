const router = require('express').Router()
const sportsController = require('../controllers/sportsController')
const auth = require('../controllers/function/function')

router.get('/', sportsController.urgentPostList)
router.get('/posts', sportsController.findPost)
router.post('/posts', auth.isAuth, sportsController.writePost)
router.patch('/posts/:postId', auth.isAuth, sportsController.updatePost)
router.delete('/posts/:postId', auth.isAuth, sportsController.deletePost)
router.get('/posts/chat', auth.isAuth, sportsController.chat)
router.get('/ground', sportsController.findGround)
router.post('/ground/:groundId/review', auth.isAuth, sportsController.writeReview)
router.patch('/ground/:groundId/review/:reviewId', auth.isAuth, sportsController.updateReview)
router.delete('/ground/:groundId/review/:reviewId', auth.isAuth, sportsController.deleteReview)

module.exports = router