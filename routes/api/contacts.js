const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { controllerWrapper, authenticate } = require('../../middlewares')

router.get('/', authenticate, controllerWrapper(ctrl.getContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.patch(
  '/:contactId/favorite',
  authenticate,
  controllerWrapper(ctrl.updateStatus)
)

router.post('/', authenticate, controllerWrapper(ctrl.addContact))

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(ctrl.removeContact)
)

router.patch('/:contactId', authenticate, controllerWrapper(ctrl.updateContact))

module.exports = router
