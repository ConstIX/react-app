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
import { FC, useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { IEditOrder, Row } from '../types/order.types'

const EditOrder: FC<IEditOrder> = ({ open, row, columns, onClose, onSave, onDelete }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Partial<Row>>({
    defaultValues: row || {}
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const onSubmit = (data: Partial<Row>) => {
    if (Object.keys(errors).length > 0) return
    onSave(data)
  }

  useEffect(() => {
    reset(row || {})
  }, [row, reset])

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {columns.map((column) =>
            column.id === 'status' ? (
              <FormControl fullWidth key={String(column.id)} margin="dense">
                <Controller
                  name={column.id as string}
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
            ) : (
              <Controller
                key={String(column.id)}
                name={column.id as string}
                control={control}
                rules={{ required: `${column.label} обязателен` }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label={column.label}
                    type="text"
                    fullWidth
                    error={!!errors[column.id]}
                    helperText={errors[column.id] ? `${errors[column.id]?.message}` : ''}
                  />
                )}
              />
            )
          )}

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
          <Button onClick={onDelete} variant="outlined" color="error">
            Удалить
          </Button>
          <Button type="submit" variant="contained" disableElevation color="primary">
            Применить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditOrder
