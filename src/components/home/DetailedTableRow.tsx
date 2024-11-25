import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { Order } from '../../types/order.types'

const DetailedTableRow: FC<{ row: Order }> = ({ row }) => {
  const columns: GridColDef[] = [
    { field: 'product', headerName: 'Product', width: 250 },
    { field: 'price', headerName: 'Price', width: 250 },
    { field: 'quantity', headerName: 'Quantity', width: 250 }
  ]

  return (
    <Box className="p-5">
      <Typography variant="h6" color="primary" gutterBottom>
        Products
      </Typography>
      <DataGrid
        rows={row.items || []}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnMenu
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }}
      />
    </Box>
  )
}

export default DetailedTableRow
