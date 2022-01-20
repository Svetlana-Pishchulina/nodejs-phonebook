const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { User } = require('../model').userModel

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw Unauthorized('Not authorized')
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token) {
      throw Unauthorized('Not authorized')
    }
    req.user = user
    next()
  } catch (error) {
    error.status = 401
    next(error)
  }
}
module.exports = authenticate
