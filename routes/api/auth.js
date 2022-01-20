const express = require('express')
const ctrl = require('../../controllers/auth')
const { controllerWrapper, authenticate, upload } = require('../../middlewares')
const router = express.Router()

router.patch('/', authenticate, controllerWrapper(ctrl.updateSubscription))
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar)
)
router.post('/signup', controllerWrapper(ctrl.register))
router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))
router.post('/verify', controllerWrapper(ctrl.reVerification))
router.post('/login', controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))

module.exports = router
