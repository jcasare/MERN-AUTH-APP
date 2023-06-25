const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  console.log('triggered')
  if (!req.session || !req.session.user) {
    throw new UnauthenticatedError('not authenticated')
  }
  if (req.session && shouldRefreshSession(req.session)) {
    req.session.regenerate((err) => {
      if (err) {
        throw new UnauthenticatedError('not authorized')
      }
      next()
    })
  }
  console.log(req.session.user)

  next()
}

const shouldRefreshSession = (session) => {
  const currentTime = Date.now()
  const sessionExpTime = session.cookie.expires.getTime()
  const sessionRefreshThreshold = 5 * 60 * 1000 //refresh session if its within 5 mins of expiration

  return sessionExpTime - currentTime < sessionRefreshThreshold
}
module.exports = authenticationMiddleware
