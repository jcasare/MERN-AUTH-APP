import { Link } from 'react-router-dom'
import avatar from '../assets/user (2).png'
import styles from '../css/username.module.css'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import { userLogin } from '../helper/apiRequests'
import { useAuthStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
import useFetch from '../custom-hooks/fetchData'

const Password = () => {
  const navigate = useNavigate()
  const { username } = useAuthStore((state) => state.auth)

  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`)
  console.log(apiData)
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginRequest = userLogin({ username, password: values.password })
      toast.promise(loginRequest, {
        loading: 'Verifying...',
        success: <p>Login Successful...!!</p>,
        error: <p>Wrong or Invalid Password!!</p>,
      })
      loginRequest.then((resp) => {
        if (resp.data.msg === 'Login successful') {
          navigate('/profile')
        }
      })
    },
  })
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (serverError) {
    return <h1>{serverError.message}</h1>
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.user?.firstName || apiData?.user?.username}!
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Experience more by connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.user?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              <button type="submit" className={styles.btn}>
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?
                <Link className="text-red-500 mx-1" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Password
