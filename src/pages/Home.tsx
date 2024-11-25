import { Add } from '@mui/icons-material'
import { Alert, Box, Button, debounce, Snackbar } from '@mui/material'
import { useState } from 'react'
import CreateOrder from '../components/home/CreateOrder'
import DataTable from '../components/home/DataTable'
import OrderFilters from '../components/home/OrderFilters'
import { useGetOrdersQuery } from '../redux/services/orders'

export interface IFilters {
  searchValue: string
  searchBy: string
  startDate: string
  endDate: string
  currentPage: number
}

export interface ISnackbar {
  message: string
  open: boolean
  severity: 'success' | 'error'
}

const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [snackbarState, setSnackbarState] = useState<ISnackbar>({ message: '', open: false, severity: 'success' as 'success' | 'error' })
  const [filters, setFilters] = useState<IFilters>({ searchValue: '', searchBy: 'All', startDate: '', endDate: '', currentPage: 0 })

  const { data: orders } = useGetOrdersQuery({
    page: `?page=${filters.currentPage + 1}&limit=5`,
    search: filters.searchValue ? `&customerName=*${filters.searchValue}*` : '',
    searchBy: filters.searchBy === 'All' ? '' : `&status=*${filters.searchBy}*`,
    date: filters.startDate && filters.endDate ? `&date[]=${filters.startDate}&date[]=${filters.endDate}` : ''
  })

  const handleInputChange = debounce((key: keyof IFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, currentPage: key === 'searchValue' ? 0 : prev.currentPage }))
  }, 300)

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'customerName', label: 'Customer name', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'date', label: 'Date', sortable: true }
  ]

  return (
    <Box className="custom-container">
      <Box className="mb-10 flex justify-between">
        <OrderFilters filters={filters} handleInputChange={handleInputChange} orders={orders?.items || []} />
        <Button onClick={() => setOpenModal(true)} variant="contained" color="primary" disableElevation startIcon={<Add />}>
          New order
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={orders?.items || []}
        count={orders?.meta.total_items || 0}
        page={filters.currentPage}
        onPageChange={(_, value) => setFilters((prev) => ({ ...prev, currentPage: value }))}
      />

      <CreateOrder openModal={openModal} setOpenModal={setOpenModal} setSnackbarState={setSnackbarState} />

      <Snackbar open={snackbarState.open} autoHideDuration={3000} onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbarState.severity} onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Home
