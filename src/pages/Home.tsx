import { Add, Delete, ModeEditOutline } from '@mui/icons-material'
import { Alert, Box, Button, debounce, IconButton, Snackbar } from '@mui/material'
import { useState } from 'react'
import CreateOrder from '../components/home/CreateOrder'
import DataTable from '../components/home/DataTable'
import OrderFilters from '../components/home/OrderFilters'
import { useDeleteOrderMutation, useGetOrdersQuery } from '../redux/services/orders'
import { Order } from '../types/order.types'

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
  const [orderData, setOrderData] = useState<Order | null>(null)
  const [snackbarState, setSnackbarState] = useState<ISnackbar>({ message: '', open: false, severity: 'success' as 'success' | 'error' })
  const [filters, setFilters] = useState<IFilters>({ searchValue: '', searchBy: 'All', startDate: '', endDate: '', currentPage: 0 })

  const [deleteOrder] = useDeleteOrderMutation()
  const { data: orders } = useGetOrdersQuery({
    page: `?page=${filters.currentPage + 1}&limit=5`,
    search: filters.searchValue ? `&customerName=*${filters.searchValue}*` : '',
    searchBy: filters.searchBy === 'All' ? '' : `&status=*${filters.searchBy}*`,
    date: filters.startDate && filters.endDate ? `&date[]=${filters.startDate}&date[]=${filters.endDate}` : ''
  })

  const handleEditOrder = (order: Order) => {
    setOrderData(order)
    setOpenModal(true)
  }

  const handleDeleteOrder = (id: number) => {
    try {
      deleteOrder(id)
      setSnackbarState({ message: 'Action completed successfuly!', open: true, severity: 'success' })
    } catch (error) {
      setSnackbarState({ message: 'Action completed successfuly!', open: true, severity: 'success' })
      console.error(error)
    }
  }

  const handleInputChange = debounce((key: keyof IFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, currentPage: key === 'searchValue' ? 0 : prev.currentPage }))
  }, 300)

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'customerName', label: 'Customer name', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'date', label: 'Date', sortable: true },
    {
      id: 'actions',
      label: '',
      getActions: (params: Order) => [
        <IconButton key={1} color="primary" onClick={() => handleEditOrder(params)}>
          <ModeEditOutline />
        </IconButton>,
        <IconButton key={2} color="error" onClick={() => handleDeleteOrder(params.id as number)}>
          <Delete />
        </IconButton>
      ]
    }
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

      <CreateOrder openModal={openModal} setOpenModal={setOpenModal} setSnackbarState={setSnackbarState} orderData={orderData} />

      <Snackbar open={snackbarState.open} autoHideDuration={3000} onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbarState.severity} onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Home
