const User = require('../model/User')
const { NotFoundError, UnauthenticatedError } = require('../errors')
const verifyUser = async (req, res, next) => {
  const { username } = req.method == 'GET' ? req.query : req.body
  const existingUser = await User.findOne({ username })
  if (!existingUser) {
    throw new NotFoundError('User not found')
  }

  next()
}

module.exports = verifyUser
