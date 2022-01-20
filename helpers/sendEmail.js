const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

// SENGRID
const sendEmail = async (data) => {
  const email = { ...data, from: 'svetlana.plias@gmail.com' }
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email)
    return true
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
