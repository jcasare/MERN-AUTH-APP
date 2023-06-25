import axios from 'axios'

// Make API requests
axios.defaults.baseURL = 'http://localhost:3000'
// Auth functionality
export const authenticate = async (username) => {
  try {
    const { data, status } = await axios.post('/api/v1/user/authUser', {
      username,
    })
    return { data, status }
  } catch (error) {
    return { error: 'Username not valid' }
  }
}

// Get User Data Function

export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/v1/user/${username}`)
    return { data }
  } catch (error) {
    return { error: `Password does not match` }
  }
}

//Register User
export const registerUser = async (userData) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post('/api/v1/auth/register', userData)
    let { username, email } = userData
    if (status === 201) {
      await axios.post('/api/v1/user/sendMail', {
        username,
        userMail: email,
        text: msg,
      })
    }
    return msg
  } catch (error) {
    throw { error }
  }
}

//Login User

export const userLogin = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post('/api/v1/auth/login', {
        username,
        password,
      })
      return { data }
    }
  } catch (error) {
    throw { error: ' Password does not match' }
  }
}

// Update User Profile

export const updateUser = async (response) => {
  try {
    const data = await axios.patch('/api/v1/user/updateUser', response)
    return { data }
  } catch (error) {
    return Promise.reject({ error: ' Could not update user profile' })
  }
}

//Gen OTP

export const genOtp = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/v1/user/genOTP', { params: { username } })
    //send mail to user with generated OTP
    if (status === 201) {
      const {
        data: { email },
      } = await getUser({ username })
      const text = `Your Password Recovery OTP is ${code}`
      await axios.post('/api/v1/user/sendMail', {
        username,
        userMail: email,
        text,
        subject: 'Password Recovery',
      })
    }
    return code
  } catch (error) {
    throw { error }
  }
}

export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get('/api/v1/user/verifyOTP', {
      params: { username, code },
    })
    return { data, status }
  } catch (error) {
    throw error
  }
}

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.patch('/api/v1/user/resetPassword', {
      username,
      password,
    })
    return { data, status }
  } catch (error) {
    throw { error }
  }
}
