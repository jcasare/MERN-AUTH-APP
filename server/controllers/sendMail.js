const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
require('dotenv').config

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.TEST_EMAIL,
    pass: process.env.TEST_PASS,
  },
})
let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
})
const sendMail = async (req, res) => {
  const { username, userMail, text, subject } = req.body

  //body of email
  let email = {
    body: {
      name: username,
      intro:
        text || "Welcome to JayCorp!! We're very excite to have you on board.",
      outro: 'Need help? Kindly reply to this email. We are here to help you.',
    },
  }
  let mailBody = MailGenerator.generate(email)
  let message = {
    from: process.env.TEST_EMAIL,
    to: userMail,
    subject: subject || 'Signup Success!! OTP Verification',
    html: mailBody,
  }

  try {
    await transporter.sendMail(message)
    return res
      .status(StatusCodes.OK)
      .json({ msg: 'We have sent you an email with verification' })
  } catch (error) {
    throw new BadRequestError(error)
  }
}

module.exports = sendMail
