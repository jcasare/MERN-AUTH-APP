const { StatusCodes } = require('http-status-codes')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const User = require('../model/User')
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require('../errors')
const sendMail = require('../controllers/sendMail')

const authenticateUser = async (req, res) => {
  return res.status(StatusCodes.OK).send('username verified')
}

const getUser = async (req, res) => {
  console.log(`triggered`)
  console.log(req.params)
  const { userName } = req.params
  console.log(userName)
  if (!userName) throw new BadRequestError('Invalid Username')
  const existingUser = await User.findOne({ userName })
  if (!existingUser) throw new NotFoundError('User data not found')

  const { password, ...user } = Object.assign({}, existingUser.toJSON())
  res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
  const { userID } = req.query

  if (!userID) throw new NotFoundError('User Data not found')

  const user = await User.updateOne({ _id: userID }, req.body, {
    runValidators: true,
    new: true,
  })
  if (!user) throw new NotFoundError('User not found')
  res.status(StatusCodes.CREATED).json({ msg: 'Update successful....!' })
}
const genOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })
  res.status(201).json({ code: req.app.locals.OTP })
}
const verifyOTP = async (req, res) => {
  const { OTP } = req.query
  if (parseInt(req.app.locals.OTP) === parseInt(OTP)) {
    req.app.locals.OTP = null
    req.app.locals.resetSession = true //initiate reset password session
    return res.status(200).json({ msg: 'OTP Verified!' })
  }
  throw new BadRequestError('Invalid OTP')
}
const resetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false //access to route is allowed once
    return res.status(StatusCodes.OK).json({ msg: 'Access granted' })
  }
  res.status(440).json({ msg: 'Session expired' })
}
const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      throw new BadRequestError('session expired')
    }
    const { username, password: newPassword } = req.body

    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      throw new NotFoundError('User not found')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await User.updateOne(
      { username },
      { password: hashedPassword },
      { runValidators: true }
    ).catch((err) => {
      throw new BadRequestError(err)
    })
    req.app.locals.resetSession = false
    res
      .status(StatusCodes.CREATED)
      .json({ msg: ' Password updated successfully' })
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message })
  }
}

module.exports = {
  sendMail,
  authenticateUser,
  getUser,
  updateUser,
  genOTP,
  verifyOTP,
  resetSession,
  resetPassword,
}
