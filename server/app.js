const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const {
  authMiddleware,
  sessionMiddleware,
  errorHandler,
} = require('./middleware')

// all middleware

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.disable('x-powered-by')
// app.set('trust proxy', 1)
app.use(sessionMiddleware)

app.get('/', (req, res) => {
  res.status(201).json('Home Get Request')
})

app.use('/api/v1/auth', authRouter)

// app.use('/api/v1/user', (req, res, next) => {
//   if (
//     req.path !== '/genOTP' &&
//     req.path !== '/verifyOTP' &&
//     req.path !== '/resetPassword' &&
//     req.path !== '/sendMail' &&
//     req.path !== '/authenticateUser'
//   ) {
//     authMiddleware(req, res, next)
//   } else {
//     next()
//   }
// })
app.use('/api/v1/user', userRouter)

app.use(errorHandler)
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server is listening on port ${port}...`)
      })
    } catch (error) {
      console.log(error)
    }
  })
  .catch((err) => console.log('Cannot connect to DB'))

// connectDB()
//   .then((getUri) => {
//     app.use(
//       session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//           mongoUrl: getUri,
//           collection: 'sessions',
//           touchAfter: 1800,
//           ttl: 1000 * 60 * 60,
//         }),
//         cookie: {
//           maxAge: 1000 * 60 * 60,
//           secure: true,
//           httpOnly: true,
//         },
//       })
//     )

//     app.get('/', (req, res) => {
//       res.status(201).json('Home Get Request')
//     })

//     app.use('/api/v1/auth', authRouter)

//     app.listen(port, () => {
//       console.log(`Server is listening on port ${port}...`)
//     })
//   })
//   .catch((err) => {
//     console.log('Cannot connect to DB')
//     console.error(err)
//   })
