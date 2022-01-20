const { NotFound, BadRequest } = require('http-errors')
const { Contact, joiSchemaUdateContact } = require('../../model').contactsModel

const updateContact = async (req, res, next) => {
  const { _id } = req.user
  const { error } = joiSchemaUdateContact.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }
  const contactId = req.params.contactId
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    { ...req.body },
    { new: true }
  )

  if (!updatedContact) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'file was updated',
    data: { result: updatedContact },
  })
}
module.exports = updateContact
