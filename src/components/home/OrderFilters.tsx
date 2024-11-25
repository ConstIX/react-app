import { Close, FilterList } from '@mui/icons-material'
import { Autocomplete, Box, Dialog, DialogContent, IconButton, TextField, useMediaQuery } from '@mui/material'
import { FC, useState } from 'react'
import { IFilters } from '../../pages/Home'
import { Order } from '../../types/order.types'

type Key = 'searchValue' | 'searchBy' | 'startDate' | 'endDate'
interface IOrderFilters {
  orders: Order[]
  filters: IFilters
  handleInputChange: (key: Key, value: string) => void
}

const OrderFilters: FC<IOrderFilters> = ({ orders, filters, handleInputChange }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const isLaptop = useMediaQuery('(max-width: 992.98px)')

  const searchByOptions = ['All', 'Awaiting', 'Sent', 'Delivered']
  const searchOptions = [...orders].map((obj) => obj.customerName)

  const renderAutocomplete = (options: string[], label: string, value: string, key: Key, freeSolo?: boolean) => (
    <Autocomplete
      freeSolo={freeSolo}
      options={options}
      value={value}
      size="small"
      onInputChange={(_, newValue) => handleInputChange(key, newValue)}
      sx={{ width: isLaptop ? 300 : 200 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )

  const renderTextField = (label: string, value: string, key: Key) => (
    <TextField type="date" label={label} value={value} onChange={(e) => handleInputChange(key, e.target.value)} variant="outlined" size="small" slotProps={{ inputLabel: { shrink: true } }} />
  )

  return (
    <Box>
      {isLaptop ? (
        <IconButton onClick={() => setOpenModal(true)}>
          <FilterList color="primary" />
        </IconButton>
      ) : (
        <Box className="flex gap-2">
          {renderAutocomplete(searchOptions, 'Search', filters.searchValue, 'searchValue', true)}
          {renderAutocomplete(searchByOptions, 'Status', filters.searchBy, 'searchBy')}
          {renderTextField('Start date', filters.startDate, 'startDate')}
          {renderTextField('End date', filters.endDate, 'endDate')}
        </Box>
      )}

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <IconButton onClick={() => setOpenModal(false)} sx={{ justifyContent: 'flex-end' }}>
          <Close color="primary" />
        </IconButton>

        <DialogContent className="flex flex-col gap-4">
          {renderAutocomplete(searchOptions, 'Search', filters.searchValue, 'searchValue', true)}
          {renderAutocomplete(searchByOptions, 'Status', filters.searchBy, 'searchBy')}
          {renderTextField('Start date', filters.startDate, 'startDate')}
          {renderTextField('End date', filters.endDate, 'endDate')}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default OrderFilters
