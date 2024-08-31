import { Alert, Snackbar } from '@mui/material'
import { LockKeyhole, Mail, User } from 'lucide-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../redux/services/auth'

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterUserMutation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const response = await registerUser(data).unwrap()
      const token = response.token
      localStorage.setItem('token', token)
    } catch (err) {
      console.error('Failed to register:', err)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) navigate('/')
      if (token) navigate('/')
    }, 1000)
  }, [isSuccess, navigate, token])

  return (
    <section className="flex flex-1 items-center justify-center px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-sm rounded-lg p-6 shadow-md"
      >
        <h3 className="mb-7 text-center text-3xl font-medium">Register</h3>

        <div className="mb-4">
          <div className="mb-1 flex items-center gap-3">
            <User color="#aeaeae" />
            <input
              type="text"
              placeholder="Username"
              className="input"
              {...register('username', { required: 'Username is required!' })}
            />
          </div>

          {errors.username && (
            <p className="ml-8 text-sm text-red-500">{errors.username.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-center gap-3">
            <Mail color="#aeaeae" />
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: 'Email is required!' })}
            />
          </div>
          {errors.email && (
            <p className="ml-8 text-sm text-red-500">{errors.email.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-center gap-3">
            <LockKeyhole color="#aeaeae" />
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: 'Password is required!' })}
            />
          </div>
          {errors.password && (
            <p className="ml-8 text-sm text-red-500">{errors.password.message as string}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="btn mb-2 mt-5 w-full">
          Submit
        </button>
        <Link to="/login" className="block text-center hover:underline">
          Already have an account?
        </Link>
      </form>

      <Snackbar
        open={isSuccess || isError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={isSuccess ? 'success' : 'warning'} variant="filled">
          {isSuccess ? 'Success!' : 'Something went wrong!'}
        </Alert>
      </Snackbar>
    </section>
  )
}

export default Register
