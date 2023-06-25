import toast from 'react-hot-toast'
import { authenticate } from './apiRequests'

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values)
  if (values.username) {
    const { status } = await authenticate(values.username)

    if (status !== 200) {
      errors.exit = toast.error('User does not exist')
    }
  }

  return errors
}
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values)
  return errors
}
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values)
  if (values.password !== values.confirm_password) {
    errors.exist = toast.error('Passwords do not match')
  }
  return errors
}
export async function registerValidate(values) {
  const errors = usernameVerify({}, values)
  passwordVerify(errors, values)
  emailVerify(errors, values)
  return errors
}

export async function profileValidate(values) {
  const errors = emailVerify({}, values)
  return errors
}

function emailVerify(error = {}, values) {
  const emailRegex =
    /^(?!.*[\s<>])(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!values.email) {
    error.email = toast.error('Email required')
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong email')
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error('Invalid email....')
  }
  return error
}
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username required...!!')
  } else if (values.username.includes('   ')) {
    error.username = toast.error('Invalid/No username')
  }
  return error
}

function passwordVerify(error = {}, values) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (!values.password) {
    error.password = toast.error('Password required...!!')
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Invalid Password')
  } else if (values.password.length < 8) {
    error.password = toast.error(
      'Password cannot be less than 4 characters long'
    )
  } else if (!regex.test(values.password)) {
    error.password = toast.error('Password does not meet requirements')
  }
  return error
}
