// OrdersTable.tsx

import { useEffect, useState } from 'react'
import OrderFilters from '../components/Filter'
import DataTable from '../components/Table'
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation
} from '../redux/services/orders'

const columns = [
  { id: 'orderNumber', label: 'Номер заказа', sortable: true, editable: false },
  { id: 'customerName', label: 'Имя клиента', sortable: true, editable: true },
  { id: 'status', label: 'Статус', sortable: true, editable: true },
  { id: 'createdDate', label: 'Дата создания', sortable: true, editable: false }
]

const Home = () => {
  const { data: orders = [] } = useGetOrdersQuery({})
  const [updateOrder] = useUpdateOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()
  const [filteredOrders, setFilteredOrders] = useState(orders || [])

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  const handleFilterChange = (filterFunction: (row: Record<string, string>) => boolean) => {
    const filtered = orders.filter(filterFunction)
    setFilteredOrders(filtered)
  }

  const handleEdit = (id: number | string, updatedRow: Record<string, string>) => {
    updateOrder({ id, ...updatedRow })
  }

  const handleDelete = (id: number | string) => {
    deleteOrder(id)
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-10">
      <OrderFilters onFilterChange={handleFilterChange} />
      <DataTable
        columns={columns}
        rows={filteredOrders || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default Home
