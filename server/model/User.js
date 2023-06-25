const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { BadRequestError } = require('../errors')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'username exists already'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    unique: false,
    minLength: [6, 'password must be at least 6 characters'],
    // match: [
    //   '/^(?!.*[s<>])(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
    //   'Password does not meet requirements...',
    // ],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email exists already'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  firstName: {
    type: String,
    unique: false,
    minLength: [3, 'first Name must be at least 3 characters'],
  },
  lastName: {
    type: String,

    unique: false,
    minLength: [3, 'lastName must be at least 3 characters'],
  },
  phoneNumber: {
    type: String,
    unique: false,
    minLength: [10, 'phone Number must be at least 10 characters'],
  },
  address: {
    type: String,
  },
  profile: {
    type: String,
  },
})
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.post('save', async function (err, doc, next) {
  if (err) {
    next(err)
  }
})
UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
