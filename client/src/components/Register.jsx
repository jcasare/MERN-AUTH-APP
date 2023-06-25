import { Link } from 'react-router-dom'
import avatar from '../assets/user (2).png'
import styles from '../css/username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { useState } from 'react'
const Register = () => {
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues: {
      email: 'abc12@deeznuts.com',
      username: 'cum4tar69',
      password: '',
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' })
    },
  })

  const handleUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Sign Up</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to have you join us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile_img">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input type="file" onChange={handleUpload} id="profile_img" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="email"
                className={styles.textbox}
                placeholder="Email *"
                {...formik.getFieldProps('email')}
              />
              <input
                type="text"
                className={styles.textbox}
                placeholder="Username *"
                {...formik.getFieldProps('username')}
              />
              <input
                type="password"
                className={styles.textbox}
                placeholder="Password *"
                {...formik.getFieldProps('password')}
              />
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already a member?
                <Link className="text-red-500 mx-1" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register
