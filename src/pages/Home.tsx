import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import CreateOrder from '../components/CreateOrder'
import OrderFilters from '../components/Filter'
import DataTable from '../components/Table'
import {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation
} from '../redux/services/orders'
import { Row } from '../types/order.types'

const columns = [
  { id: 'orderNumber', label: 'Номер заказа', sortable: true },
  { id: 'customerName', label: 'Имя клиента', sortable: true },
  { id: 'status', label: 'Статус', sortable: true },
  { id: 'createdDate', label: 'Дата создания', sortable: true }
]

const Home = () => {
  const { data: orders } = useGetOrdersQuery({})
  const [createOrder] = useCreateOrderMutation()
  const [updateOrder] = useUpdateOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()

  const [filteredOrders, setFilteredOrders] = useState(orders || [])
  const [openModal, setOpenModal] = useState(false)

  const handleFilterChange = (filterFunction: (row: Record<string, string>) => boolean) => {
    const filtered = orders.filter(filterFunction)
    setFilteredOrders(filtered)
  }

  const handleCreate = (createdRow: Row) => {
    createOrder(createdRow)
  }

  const handleEdit = (id: number | string, updatedRow: Record<string, string>) => {
    updateOrder({ id, ...updatedRow })
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
          style={{ width: 244 }}
        >
          Создать новый заказ
        </Button>

        <CreateOrder open={openModal} onClose={handleCreateModal} onSave={handleCreate} />
      </Box>

      <DataTable
        columns={columns}
        rows={filteredOrders || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  )
}

export default Home
