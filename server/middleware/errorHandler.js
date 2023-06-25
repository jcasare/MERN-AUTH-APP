const { CustomAPIError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandler = async (err, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  let message = 'Something went wrong, please try again'
  if (err instanceof CustomAPIError) {
    statusCode = err.statusCode
    message = err.message
  }
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.BAD_REQUEST
    message = err.message
  }
  if (err.message === 'Email already exists') {
    statusCode = StatusCodes.CONFLICT
  }
  if (err.name === 'UnauthorizedError') {
    statusCode = StatusCodes.UNAUTHORIZED
    message = err.message
  }
  if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 409
    message = 'email or username already in use'
  }
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.UNAUTHORIZED
    message = 'Password does not meet requirements'
  }
  console.log(err)
  return res.status(statusCode || 500).json({ message })
}

module.exports = errorHandler
