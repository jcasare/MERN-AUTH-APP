const CustomAPIError = require('./custom-api')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
