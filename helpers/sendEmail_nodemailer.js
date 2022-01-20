const nodemailer = require('nodemailer')
require('dotenv').config()
const { META_UA_KEY } = process.env

// nodemailer
const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: '465',
  secure: 'true',
  auth: {
    user: 'Svetlana_Pishchulina@meta.ua',
    path: META_UA_KEY,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const email = { ...data, from: 'Svetlana_Pishchulina@meta.ua' }
  // eslint-disable-next-line no-useless-catch
  try {
    await transporter.sendMail(email)
    return true
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendEmail
