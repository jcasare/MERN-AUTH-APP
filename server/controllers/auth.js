const User = require('../model/User')
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require('../errors')
const { StatusCodes } = require('http-status-codes')

const registerUser = async (req, res) => {
  const { username, email, password, profile } = req.body
  if (!email || !password || !username) {
    throw new BadRequestError(
      'Please enter a valid email, username and password'
    )
  }

  const user = await User.create({ ...req.body })
  const userSession = {
    _id: user._id,
    username: user.username,
    email: user.email,
  }
  req.session.user = userSession

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'User created successfully', user: { username } })
}

const loginUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Please enter a valid username and password')
  }
  const user = await User.findOne({ username })
  if (!user) {
    throw new UnauthenticatedError('Username does not exist')
  }
  const passwordCheck = await user.comparePassword(password)
  if (!passwordCheck) {
    throw new UnauthenticatedError('Incorrect credentials')
  }
  const userSession = {
    _id: user._id,
    username: user.username,
    email: user.email,
  }

  req.session.user = userSession
  res.status(200).json({ msg: 'Login successful', username: user.username })
}

module.exports = {
  registerUser,
  loginUser,
}
