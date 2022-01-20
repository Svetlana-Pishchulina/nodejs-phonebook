const { User } = require('../../model/userModel')
const path = require('path')
const fs = require('fs').promises
const Jimp = require('jimp')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user

  const { path: tempDir, originalname } = req.file
  const [extantion] = originalname.split('.').reverse()

  await Jimp.read(tempDir)
    .then((avatar) => {
      return (
        avatar
          // .resize(250, 250) // resize
          .contain(250, 250)
          .greyscale()
          .write(tempDir)
      )
    })
    .catch((err) => {
      console.error(err)
    })

  const fileName = `${_id}_main-image.${extantion}`
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', fileName)
  try {
    await fs.rename(tempDir, uploadDir)
    const avatarURL = path.join('avatars', fileName)
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
