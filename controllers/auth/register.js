const { BadRequest, Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User, joiSchemaUserRegister } = require('../../model').userModel
const { sendEmail } = require('../../helpers')

const register = async (req, res, next) => {
  const error = await joiSchemaUserRegister.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const { email, password, name } = req.body
  // const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const avatarURL = gravatar.url(email)
  const verifyToken = nanoid()
  const newUser = await new User({ email, avatarURL, verifyToken })
  newUser.setPassword(password)

  await newUser.save()
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verifyToken}'>Нажмите для подтверждения регистрации на сайте</a>`,
  }
  sendEmail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      user: {
        name,
        email,
        subscription: newUser.subscription,
      },
    },
  })
}

module.exports = register
