const express = require('express')
const router = express.Router()

const {
  getUser,
  authenticateUser,
  updateUser,
  genOTP,
  verifyOTP,
  resetSession,
  resetPassword,
  sendMail,
} = require('../controllers/user')

const { verifyUser, localVariables } = require('../middleware')

router.route('/:userName').get(getUser)
router.route('/authUser').post(verifyUser, authenticateUser)
router.route('/updateUser').patch(updateUser)
router.route('/genOTP').get(verifyUser, localVariables, genOTP)
router.route('/verifyOTP').get(verifyUser, verifyOTP)
router.route('/createResetSession').get(resetSession)
router.route('/resetPassword').patch(verifyUser, resetPassword)
router.route('/sendMail').post(sendMail)
module.exports = router
