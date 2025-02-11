import { AddCircleOutline, Delete } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import moment from 'moment'
import { FC, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useCreateOrderMutation, useUpdateOrderMutation } from '../../redux/services/orders'
import { Order } from '../../types/order.types'
import RHFSelect from '../../ui/RHFSelect'
import RHFTextField from '../../ui/RHFTextField'

interface ICreateOrder {
  openModal: boolean
  setOpenModal: (i: boolean) => void
  setSnackbarState: (state: { message: string; open: boolean; severity: 'success' | 'error' }) => void
  orderData?: Order | null
}

const CreateOrder: FC<ICreateOrder> = ({ openModal, setOpenModal, setSnackbarState, orderData }) => {
  const { control, handleSubmit, reset } = useForm<Order>({
    defaultValues: {
      customerName: '',
      status: 'awaiting',
      date: moment().format('YYYY-MM-DD'),
      items: [{ id: uuidv4(), product: '', quantity: 0, price: 0 }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const [createOrder] = useCreateOrderMutation()
  const [updateOrder] = useUpdateOrderMutation()

  const onSubmit = async (data: Order) => {
    try {
      const order = {
        ...data,
        items: data.items.map(({ id, product, quantity, price }) => ({ id, product, quantity, price }))
      }

      if (orderData) {
        await updateOrder({ id: orderData.id, ...order }).unwrap()
      } else {
        await createOrder(order).unwrap()
      }

      setOpenModal(false)
      reset()
      setSnackbarState({ message: 'Action completed successfuly!', open: true, severity: 'success' })
    } catch (error) {
      setSnackbarState({ message: 'Something went wrong!', open: true, severity: 'error' })
      console.error(error)
    }
  }

  useEffect(() => {
    if (orderData) reset(orderData)
  }, [orderData, reset])

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <DialogContent className="space-y-4">
          <RHFTextField name="customerName" label="Customer name" control={control} rules={{ required: 'Customer name is required.' }} required />
          <RHFSelect name="status" label="Status" control={control} options={['awaiting', 'sent', 'delivered']} defaultValue="awaiting" />
          <RHFTextField type="date" name="date" label="Date" control={control} rules={{ required: 'Date is required.' }} required />

          {fields.map((item, idx) => (
            <Box key={item.id} className="flex items-start gap-2">
              <RHFTextField name={`items.${idx}.product`} label="Product" control={control} rules={{ required: 'This field is required.' }} size="small" required />
              <RHFTextField type="number" name={`items.${idx}.quantity`} label="Quantity" control={control} rules={{ required: 'This field is required.' }} size="small" required />
              <RHFTextField type="number" name={`items.${idx}.price`} label="Price" control={control} rules={{ required: 'This field is required.' }} size="small" required />

              {fields.length > 1 && (
                <IconButton onClick={() => remove(idx)}>
                  <Delete color="error" />
                </IconButton>
              )}
            </Box>
          ))}

          <Button onClick={() => append({ id: uuidv4(), product: '', quantity: 1, price: 0 })} startIcon={<AddCircleOutline />} color="primary">
            Add product
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="error">
            Close
          </Button>
          <Button type="submit" variant="contained" disableElevation color="primary">
            {orderData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CreateOrder
