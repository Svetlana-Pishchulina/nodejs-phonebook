const { BadRequest, Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User, joiSchemaUserRegister } = require('../../model').userModel
require('dotenv').config()

const login = async (req, res) => {
  const error = await joiSchemaUserRegister.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password) || !user.verify) {
    throw Unauthorized('Email or password is wrong, or email nor verify')
  }
  const { SECRET_KEY } = process.env
  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    status: 'success',
    code: 200,
    data: { token, user: { email, subscription: user.subscription } },
  })
}
module.exports = login
