const { NotFound } = require('http-errors')
const { Contact } = require('../../model').contactsModel

const removeContact = async (req, res, next) => {
  const { _id } = req.user
  const contactId = req.params.contactId
  const newContactsList = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: _id,
  })
  if (!newContactsList) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'success deleted',
  })
}

module.exports = removeContact
