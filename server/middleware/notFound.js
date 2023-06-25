const notFoundMiddleware = async (req, res, next) => {
  return res.status(404).json({ msg: 'Route is not available' })
}

module.exports = notFoundMiddleware
