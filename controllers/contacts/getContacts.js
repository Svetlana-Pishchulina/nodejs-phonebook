const { Contact } = require('../../model').contactsModel

const getContacts = async (req, res, next) => {
  const { page = 1, limit = 10, favorite } = req.query
  const skip = Number(page) - 1
  const { _id } = req.user

  const contacts = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    '',
    {
      skip: skip,
      limit: Number(limit),
    }
  )

  res.json({
    status: 'success',
    code: 200,
    message: 'contacts found',
    data: { result: contacts },
  })
}

module.exports = getContacts
