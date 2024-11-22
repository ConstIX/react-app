import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import CreateOrder from '../components/CreateOrder'
import OrderFilters from '../components/Filter'
import DataTable from '../components/Table'
import { useDeleteOrderMutation, useGetOrdersQuery } from '../redux/services/orders'

const columns = [
  { id: 'id', label: 'Номер заказа', sortable: true },
  { id: 'customerName', label: 'Имя клиента', sortable: true },
  { id: 'status', label: 'Статус', sortable: true },
  { id: 'date', label: 'Дата создания', sortable: true }
]

const Home = () => {
  const { data: orders } = useGetOrdersQuery()
  const [deleteOrder] = useDeleteOrderMutation()

  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [openModal, setOpenModal] = useState(false)

  const handleFilterChange = (filterFunction: (row: Record<string, string>) => boolean) => {
    const filtered = orders?.filter(filterFunction)
    setFilteredOrders(filtered)
  }

  const handleDelete = (id: number | string) => {
    deleteOrder(id)
  }

  const handleCreateModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  return (
    <Box className="custom-container">
      <OrderFilters onFilterChange={handleFilterChange} />

      <Box className="mb-5 text-right">
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Add />}
        >
          New order
        </Button>

        <CreateOrder open={openModal} onClose={handleCreateModal} />
      </Box>

      <DataTable columns={columns} rows={filteredOrders || []} onDelete={handleDelete} />
    </Box>
  )
}

export default Home
