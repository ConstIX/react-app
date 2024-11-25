import { Autocomplete, Box, TextField } from '@mui/material'
import { FC } from 'react'
import { IFilters } from '../../pages/Home'
import { Order } from '../../types/order.types'

type Key = 'searchValue' | 'searchBy' | 'startDate' | 'endDate'
interface IOrderFilters {
  orders: Order[]
  filters: IFilters
  handleInputChange: (key: Key, value: string) => void
}

const OrderFilters: FC<IOrderFilters> = ({ orders, filters, handleInputChange }) => {
  const searchByOptions = ['All', 'Awaiting', 'Sent', 'Delivered']
  const searchOptions = [...orders].map((obj) => obj.customerName)

  const renderAutocomplete = (options: string[], label: string, value: string, key: Key, freeSolo?: boolean) => (
    <Autocomplete
      freeSolo={freeSolo}
      options={options}
      value={value}
      size="small"
      onInputChange={(_, newValue) => handleInputChange(key, newValue)}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )

  const renderTextField = (label: string, value: string, key: Key) => (
    <TextField type="date" label={label} value={value} onChange={(e) => handleInputChange(key, e.target.value)} variant="outlined" size="small" slotProps={{ inputLabel: { shrink: true } }} />
  )

  return (
    <Box className="flex gap-2">
      {renderAutocomplete(searchByOptions, 'Status', filters.searchBy, 'searchBy')}
      {renderTextField('Start date', filters.startDate, 'startDate')}
      {renderTextField('End date', filters.endDate, 'endDate')}
      {renderAutocomplete(searchOptions, 'Search', filters.searchValue, 'searchValue', true)}
    </Box>
  )
}

export default OrderFilters
