import { Link } from 'react-router-dom'
import avatar from '../assets/user (2).png'
import styles from '../css/username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../helper/validate'
const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  })
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password..
            </span>
          </div>
          <form className="py-10" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                className={styles.textbox}
                placeholder="New Password"
                {...formik.getFieldProps('password')}
              />
              <input
                type="password"
                className={styles.textbox}
                placeholder="Confirm Password"
                {...formik.getFieldProps('confirm_password')}
              />
              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Reset
