const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.get('/activate/:link', userController.activate)
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/auth', authMiddleware, userController.auth);
router.post('/info', authMiddleware, userController.getUserData)
router.patch('/patch', userController.patchUserData)

module.exports = router;