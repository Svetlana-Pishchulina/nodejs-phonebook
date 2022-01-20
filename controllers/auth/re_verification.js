const { BadRequest } = require('http-errors')

const { User } = require('../../model').userModel
const { sendEmail } = require('../../helpers')

const reVerification = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }

  const user = await User.findOne({ email })
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${user.verifyToken}'>Нажмите для подтверждения регистрации на сайте</a>`,
  }

  sendEmail(mail)

  res.status(200).json({
    status: 'success',
    code: 201,
    message: 'email resened',
  })
}

module.exports = reVerification
