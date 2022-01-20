const { User, joiSchemaUserUpdate } = require('../../model/userModel')
const { BadRequest } = require('http-errors')

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user
  const { subscription = 'starter' } = req.body
  if (!subscription) {
    throw new BadRequest('missing field subscription')
  }
  const { error } = joiSchemaUserUpdate.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    code: 200,
    message: `subscription updated to ${subscription}`,
    data: { result },
  })
}

module.exports = updateSubscription
