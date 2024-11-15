import { Box } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import PrivateRoute from './components/PrivateRoute'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {
  const { pathname } = useLocation()

  return (
    <Box className="flex min-h-screen flex-col">
      {pathname !== '/auth' && <Header />}

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Box>
  )
}

export default App
