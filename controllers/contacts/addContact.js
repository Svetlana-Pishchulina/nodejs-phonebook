const { BadRequest } = require('http-errors')
const { Contact, joiSchemaAddContact } = require('../../model').contactsModel

const addContact = async (req, res, next) => {
  const { _id } = req.user
  const error = await joiSchemaAddContact.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const newContact = await Contact.create({ ...req.body, owner: _id })
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'contact was added',
    data: { result: newContact },
  })
}

module.exports = addContact
