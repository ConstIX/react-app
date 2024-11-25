import { Delete, KeyboardArrowDown, KeyboardArrowUp, ModeEditOutline } from '@mui/icons-material'
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TablePaginationProps, TableRow, TableSortLabel } from '@mui/material'
import { FC, Fragment, useState } from 'react'
import { Order } from '../../types/order.types'

interface IDataTable {
  columns: {
    id: keyof Order
    label: string
    sortable?: boolean
  }[]
  rows: Order[] | null
  count: number
  page: number
  onPageChange: TablePaginationProps['onPageChange']
}

const DataTable: FC<IDataTable> = ({ columns, rows, count, page, onPageChange }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Order | undefined>(undefined)
  const [openRows, setOpenRows] = useState<number | null>(null)

  const handleSort = (columnId: keyof Order) => {
    if (orderBy === columnId) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(columnId)
      setOrder('asc')
    }
  }

  const handleToggleRow = (id: number) => {
    setOpenRows((prev) => (prev === id ? null : id))
  }

  const sortedRows = rows?.slice().sort((a, b) => {
    if (!orderBy) return 0
    const aValue = a[orderBy]
    const bValue = b[orderBy]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })

  return (
    <Paper>
      <TableContainer sx={{ height: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 600 }}>
                  {column.sortable ? (
                    <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleSort(column.id)}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows?.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleToggleRow(row.id as number)}>
                      {openRows === row.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton color="primary">
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ padding: 0 }} colSpan={columns.length + 2}>
                    <Collapse in={openRows === row.id} timeout="auto" unmountOnExit>
                      Детальная информация товара: {row.id}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination component="div" rowsPerPageOptions={[5]} count={count} rowsPerPage={5} page={page} onPageChange={onPageChange} />
    </Paper>
  )
}

export default DataTable
