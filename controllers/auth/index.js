const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const reVerification = require('./re_verification')

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verify,
  reVerification,
}
