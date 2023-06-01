import { Link } from 'react-router-dom'
import avatar from '../assets/user (2).png'
import styles from '../css/username.module.css'
import extraStyles from '../css/profile.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { useState } from 'react'
const Profile = () => {
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' })
      console.log(values)
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
        <div className={`${styles.glass} ${extraStyles.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Your Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update your details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile_img">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img} ${extraStyles.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input type="file" onChange={handleUpload} id="profile_img" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  className={`${styles.textbox} ${extraStyles.textbox}`}
                  placeholder="First Name *"
                  {...formik.getFieldProps('firstName')}
                />
                <input
                  type="text"
                  className={styles.textbox}
                  placeholder="Last Name *"
                  {...formik.getFieldProps('lastName')}
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  className={styles.textbox}
                  placeholder="Phone *"
                  {...formik.getFieldProps('phone')}
                />
                <input
                  type="email"
                  className={styles.textbox}
                  placeholder="Email *"
                  {...formik.getFieldProps('email')}
                />
              </div>

              <input
                type="text"
                className={styles.textbox}
                placeholder="Address *"
                {...formik.getFieldProps('address')}
              />
              <button type="submit" className={styles.btn}>
                Update
              </button>
            </div>
            <div className="text-center ">
              <span className="text-gray-500">
                Come back later?
                <button className="text-red-500 mx-1" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Profile
