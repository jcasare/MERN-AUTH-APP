const session = require('express-session')
const { createClient } = require('redis')
const RedisStore = require('connect-redis').default

let redisClient = createClient()
redisClient.connect().catch((err) => console.error)

const redisStore = new RedisStore({
  client: redisClient,
})

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionID',
  resave: false,
  saveUninitialized: false,
  store: redisStore,
  cookie: {
    expires: 300000,
    maxAge: 300000,
    secure: false,
    httpOnly: true,
  },
})

module.exports = sessionMiddleware
