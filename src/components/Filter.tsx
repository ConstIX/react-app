import { Box, Button, MenuItem, TextField } from '@mui/material'
import { FC, useState } from 'react'

interface OrderFiltersProps {
  onFilterChange: (filterFunction: (row: Record<string, string>) => boolean) => void
}

const OrderFilters: FC<OrderFiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleFilterChange = () => {
    onFilterChange((row) => {
      const matchesStatus = status ? row.status === status : true
      const matchesDate =
        startDate && endDate
          ? new Date(row.createdDate) >= new Date(startDate) &&
            new Date(row.createdDate) <= new Date(endDate)
          : true
      const matchesSearch = search
        ? row.customerName.toLowerCase().includes(search.toLowerCase()) ||
          row.orderNumber.includes(search)
        : true

      return matchesStatus && matchesDate && matchesSearch
    })
  }

  const resetFilters = () => {
    setStatus('')
    setStartDate('')
    setEndDate('')
    setSearch('')
    onFilterChange(() => true)
  }

  return (
    <Box className="mb-2 flex gap-2">
      <TextField
        select
        label="Статус"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        size="small"
        style={{ minWidth: '176px' }}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="Ожидает оплаты">Ожидает оплаты</MenuItem>
        <MenuItem value="Отправлен">Отправлен</MenuItem>
        <MenuItem value="Доставлен">Доставлен</MenuItem>
      </TextField>

      <div className="flex gap-2">
        <TextField
          type="date"
          label="Дата начала"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="Дата окончания"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <TextField
        label="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
      />

      <div className="ml-auto flex gap-2">
        <Button variant="contained" color="primary" onClick={handleFilterChange}>
          Применить
        </Button>

        <Button variant="outlined" color="secondary" onClick={resetFilters}>
          Сбросить
        </Button>
      </div>
    </Box>
  )
}

export default OrderFilters
