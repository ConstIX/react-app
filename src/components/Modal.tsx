// OrderModal.tsx
import { Button, CircularProgress, Modal, TextField } from '@mui/material'
import React from 'react'
import { useGetOrderByIdQuery, useUpdateOrderMutation } from '../redux/services/orders'

interface OrderModalProps {
  open: boolean
  onClose: () => void
  orderId?: number
  onDelete: (id: number) => void
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, orderId, onDelete }) => {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId, { skip: !orderId })
  const [updateOrder] = useUpdateOrderMutation()

  const handleSave = async () => {
    if (order) {
      await updateOrder(order)
      onClose()
    }
  }

  const handleDelete = () => {
    if (orderId) {
      onDelete(orderId)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h2>Edit Order</h2>
            <TextField label="Customer Name" defaultValue={order?.customerName} />
            <TextField label="Status" defaultValue={order?.status} />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default OrderModal
