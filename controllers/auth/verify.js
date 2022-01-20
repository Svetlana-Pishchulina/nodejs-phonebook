const { User } = require('../../model/userModel')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verifyToken: verificationToken })
  if (!user || user.verify) {
    throw NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null })

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  })
}

module.exports = verify
