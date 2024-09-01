import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material'
import { FC } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ICreateOrder, Row } from '../types/order.types'

const CreateOrder: FC<ICreateOrder> = ({ open, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Row>({
    defaultValues: {
      customerName: '',
      orderNumber: '',
      status: 'Ожидает оплаты',
      createdDate: new Date().toISOString().split('T')[0],
      items: [{ product: '', quantity: 1, price: 0 }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const onSubmit = (data: Row) => {
    onSave(data)
    onClose()
    reset()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <DialogContent>
          <Controller
            name="orderNumber"
            control={control}
            rules={{ required: 'Номер заказа обязателен' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Номер заказа"
                type="text"
                fullWidth
                error={!!errors.orderNumber}
                helperText={errors.orderNumber?.message}
              />
            )}
          />

          <Controller
            name="customerName"
            control={control}
            rules={{ required: 'Имя клиента обязательно' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Имя клиента"
                type="text"
                fullWidth
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
              />
            )}
          />

          <FormControl fullWidth margin="dense">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Статус" variant="outlined" size="small">
                  <MenuItem value="Ожидает оплаты">Ожидает оплаты</MenuItem>
                  <MenuItem value="Отправлен">Отправлен</MenuItem>
                  <MenuItem value="Доставлен">Доставлен</MenuItem>
                </TextField>
              )}
            />
          </FormControl>

          <Controller
            name="createdDate"
            control={control}
            rules={{ required: 'Дата создания обязательна' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Дата создания"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.createdDate}
                helperText={errors.createdDate?.message}
              />
            )}
          />

          {fields.map((item, index) => (
            <Box key={item.id} className="flex items-center gap-2">
              <Controller
                name={`items.${index}.product`}
                control={control}
                rules={{ required: 'Продукт обязателен' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Продукт"
                    margin="dense"
                    variant="outlined"
                    error={!!errors.items?.[index]?.product}
                    helperText={errors.items?.[index]?.product?.message}
                  />
                )}
              />
              <Controller
                name={`items.${index}.quantity`}
                control={control}
                rules={{
                  required: 'Количество обязательно',
                  min: { value: 1, message: 'Количество должно быть больше 0' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Количество"
                    type="number"
                    margin="dense"
                    variant="outlined"
                    style={{ width: '100px' }}
                    error={!!errors.items?.[index]?.quantity}
                    helperText={errors.items?.[index]?.quantity?.message}
                  />
                )}
              />
              <Controller
                name={`items.${index}.price`}
                control={control}
                rules={{
                  required: 'Цена обязательна',
                  min: { value: 0, message: 'Цена не может быть отрицательной' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Цена"
                    type="number"
                    margin="dense"
                    variant="outlined"
                    style={{ width: '100px' }}
                    error={!!errors.items?.[index]?.price}
                    helperText={errors.items?.[index]?.price?.message}
                  />
                )}
              />
              <IconButton onClick={() => remove(index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}

          <Button
            onClick={() => append({ product: '', quantity: 1, price: 0 })}
            startIcon={<AddCircleOutline />}
            color="primary"
            style={{ marginTop: 8 }}
          >
            Добавить товар
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
          <Button type="submit" variant="contained" disableElevation color="primary">
            Создать
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CreateOrder
