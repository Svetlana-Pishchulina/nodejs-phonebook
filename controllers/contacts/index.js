const addContact = require('./addContact')
const getContactById = require('./getContactById')
const getContacts = require('./getContacts')
const removeContact = require('./removeContact')
const updateContact = require('./updateContact')
const updateStatus = require('./updateContact')
// const getFavoriteContacts = require('./getFavoriteContacts')

module.exports = {
  addContact,
  getContacts,
  getContactById,
  removeContact,
  updateContact,
  updateStatus,
  // getFavoriteContacts,
}
