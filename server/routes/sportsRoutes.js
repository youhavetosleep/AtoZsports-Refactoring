const router = require('express').Router()
const postsController = require('../controllers/postsController')
const groundController = require('../controllers/groundController')
const auth = require('../controllers/function/function')

router.get('/', postsController.urgentPostList)
router.get('/posts', postsController.findPost)
router.post('/posts', auth.isAuth, postsController.writePost)
router.patch('/posts/:postId', auth.isAuth, postsController.updatePost)
router.delete('/posts/:postId', auth.isAuth, postsController.deletePost)

router.get('/ground', groundController.findGround)
router.post('/ground/:groundId/review', auth.isAuth, groundController.writeReview)
router.patch('/ground/:groundId/review/:reviewId', auth.isAuth, groundController.updateReview)
router.delete('/ground/:groundId/review/:reviewId', auth.isAuth, groundController.deleteReview)

module.exports = router