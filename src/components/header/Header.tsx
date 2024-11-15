import { AccountCircle, Api, Logout } from '@mui/icons-material'
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserByIdQuery } from '../../redux/services/auth'
import DropdownMenu from './Menu'

const Header: FC = () => {
  const isMobile = useMediaQuery('(max-width: 450px)')
  const navigate = useNavigate()
  const userId = localStorage.getItem('userID')
  const { data: user } = useGetUserByIdQuery(userId || '')

  const profileActions = [
    {
      label: 'Logout',
      icon: <Logout fontSize="small" />,
      function: () => {
        localStorage.clear()
        navigate('/auth')
      }
    }
  ]

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Box className="custom-container flex items-center justify-between py-0 md1:p-0">
            <Link to="/" className="flex items-center gap-3 text-2xl">
              <Api fontSize="large" /> {!isMobile && 'ReactApp'}
            </Link>

            <DropdownMenu
              actions={profileActions}
              icon={<AccountCircle fontSize="large" sx={{ color: '#fff' }} />}
              user={user}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
