const router = require('express').Router()
const userController = require('../controllers/usersController')
const auth = require('../controllers/function/function')

router.get('/', auth.isAuth, userController.myInfo)
router.patch('/', userController.update)
router.delete('/', auth.isAuth, userController.withdrawal)
router.post('/logout', userController.logout)
router.post('/security', auth.isAuth, userController.pwCheck)
router.patch('/security', auth.isAuth, userController.pwChange)
router.get('/mypost', auth.isAuth, userController.myPost)
router.get('/favorite', auth.isAuth, userController.myFavorite)
router.post('/favorite/:postId', auth.isAuth, userController.addFavorite)
router.delete('/favorite/:postId', auth.isAuth, userController.deleteFavorite)

module.exports = router