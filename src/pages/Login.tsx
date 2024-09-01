import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/services/auth'

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const response = await loginUser(data).unwrap()
      const token = response.token
      localStorage.setItem('token', token)
    } catch (err) {
      console.error('Failed to login:', err)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) navigate('/')
      if (token) navigate('/')
    }, 1000)
  }, [isSuccess, navigate, token])

  return (
    <Box className="flex flex-1 items-center justify-center px-3">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-sm rounded-lg px-10 py-6 shadow-md"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Log-in
        </Typography>

        <Box className="mb-4">
          <TextField
            type="email"
            label="Email"
            variant="standard"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message && 'Email is required!'}
            {...register('email', { required: 'Email is required!' })}
          />
        </Box>

        <Box className="mb-8">
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message && 'Password is required!'}
            {...register('password', { required: 'Password is required!' })}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          disableElevation
          style={{ marginBottom: 5 }}
        >
          Submit
        </Button>

        <Link to="/register" className="block text-center text-[#1976d3] hover:underline">
          Don't have an account?
        </Link>
      </Box>

      <Snackbar
        open={isSuccess || isError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={isSuccess ? 'success' : 'warning'} variant="filled">
          {isSuccess ? 'Success!' : 'Incorrect login or password!'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Login
