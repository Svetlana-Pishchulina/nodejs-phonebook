const { NotFound } = require('http-errors')
const { Contact } = require('../../model').contactsModel

const getContactById = async (req, res, next) => {
  const { _id } = req.user
  const contactId = req.params.contactId
  const contact = await Contact.findOne({ _id: contactId, owner: _id })
  if (!contact) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  return res.json({
    status: 'success',
    code: 200,
    message: 'contact was found',
    data: { result: contact },
  })
}

module.exports = getContactById
