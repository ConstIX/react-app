import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
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
  TableSortLabel,
  TextField
} from '@mui/material'
import React, { useMemo, useState } from 'react'

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  onEdit: (id: number | string, updatedRow: Partial<T>) => void
  onDelete: (id: number | string) => void
}

interface Column<T> {
  id: keyof T
  label: string
  sortable?: boolean
  editable?: boolean
}

const DataTable = <T extends { id: number | string; [key: string]: any }>({
  columns,
  rows,
  onEdit,
  onDelete
}: DataTableProps<T>) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5) // Фиксированное значение для количества строк на странице
  const [openRows, setOpenRows] = useState<Record<number | string, boolean>>({})
  const [editedRows, setEditedRows] = useState<Record<number | string, Partial<T>>>({})
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleRequestSort = (property: keyof T) => {
    const isAscending = orderBy === property && order === 'asc'
    setOrder(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleToggleRow = (id: number | string) => {
    setOpenRows({ ...openRows, [id]: !openRows[id] })
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const handleEdit = (id: number | string, key: keyof T, value: any) => {
    setEditedRows({
      ...editedRows,
      [id]: { ...editedRows[id], [key]: value }
    })
  }

  const handleSaveEdit = (id: number | string) => {
    const updatedRow = editedRows[id]
    if (updatedRow) {
      onEdit(id, updatedRow)
      setSnackbarOpen(true)
    }
  }

  const filteredRows = useMemo(() => {
    return rows
  }, [rows])

  const sortedRows = useMemo(() => {
    if (!orderBy) return filteredRows
    return [...filteredRows].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredRows, order, orderBy])

  const paginatedRows = useMemo(() => {
    return sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  }, [sortedRows, page, rowsPerPage])

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={String(column.id)}>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleToggleRow(row.id)}>
                      {openRows[row.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {column.editable ? (
                        <TextField
                          value={editedRows[row.id]?.[column.id] ?? row[column.id]}
                          onChange={(e) => handleEdit(row.id, column.id, e.target.value)}
                        />
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <button onClick={() => handleSaveEdit(row.id)}>Edit</button>
                    <button onClick={() => onDelete(row.id)}>Delete</button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={columns.length + 2}
                  >
                    <Collapse in={openRows[row.id]} timeout="auto" unmountOnExit>
                      Additional info for row ID: {row.id}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredRows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        color="primary"
        style={{ marginTop: 16, paddingBottom: 16, display: 'flex', justifyContent: 'center' }}
      />
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
