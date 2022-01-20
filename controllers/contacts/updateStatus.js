const { Contact, joiSchemaUdateContact } = require('../../model').contactsModel
const { NotFound, BadRequest } = require('http-errors')

const updateStatus = async (req, res, next) => {
  const { _id } = req.user
  const { contactId } = req.params
  const { isFavorite = false } = req.body
  if (!isFavorite) {
    throw new BadRequest('missing field favorite')
  }
  const { error } = joiSchemaUdateContact.validate(isFavorite)
  if (error) {
    throw new BadRequest(error.message)
  }
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    { isFavorite },
    { new: true }
  )
  if (result) {
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact added to favorite',
      data: { result },
    })
  } else {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
}

module.exports = updateStatus
