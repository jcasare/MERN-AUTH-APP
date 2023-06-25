const express = require('express')
const { verifyUser } = require('../middleware')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/auth')

router.route('/register').post(registerUser)
router.route('/login').post(verifyUser, loginUser)

module.exports = router
