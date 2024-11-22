import { Delete, KeyboardArrowDown, KeyboardArrowUp, ModeEditOutline } from '@mui/icons-material'
import {
  Alert,
  Collapse,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { FC, Fragment, useState } from 'react'
import { IDataTable, Row } from '../types/order.types'
import CreateOrder from './CreateOrder'

const DataTable: FC<IDataTable> = ({ columns, rows, onDelete }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Row | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage] = useState<number>(10)
  const [openRows, setOpenRows] = useState<Record<number | string, boolean>>({})
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<Row | null>(null)

  const handleRequestSort = (property: keyof Row) => {
    const isAscending = orderBy === property && order === 'asc'
    setOrder(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleToggleRow = (id: number | string) => {
    setOpenRows({ ...openRows, [id]: !openRows[id] })
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
    event.preventDefault()
  }

  const handleOpenDialog = (row: Row) => {
    setSelectedRow(row)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedRow(null)
  }

  const handleDelete = (row: Row) => {
    if (row) {
      onDelete(row.id)
      handleCloseDialog()
      setSnackbarOpen(true)
    }
  }

  const sortedRows = orderBy
    ? [...rows].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1
        return 0
      })
    : rows

  const paginatedRows = sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <Paper className="w-full overflow-hidden">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={String(column.id)} style={{ fontWeight: 600 }}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
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
            {paginatedRows.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleToggleRow(row.id)}>
                      {openRows[row.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>{row[column.id]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(row)}>
                      <ModeEditOutline />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(row)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={columns.length + 2}
                  >
                    <Collapse in={openRows[row.id]} timeout="auto" unmountOnExit>
                      Детальная информация товара: {row.id}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        color="primary"
        style={{ marginTop: 16, paddingBottom: 16, display: 'flex', justifyContent: 'center' }}
      />

      <CreateOrder orderData={selectedRow} open={dialogOpen} onClose={handleCloseDialog} />

      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Success!
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default DataTable
