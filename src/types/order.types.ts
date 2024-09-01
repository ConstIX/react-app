interface Item {
  product: string
  quantity: number
  price: number
}

export interface Row {
  id: number | string
  customerName?: string
  orderNumber?: string
  status?: string
  createdDate?: string
  items?: Item[]
  [key: string]: any
}

interface Column {
  id: keyof Row
  label?: string
  sortable?: boolean
}

export interface IEditOrder {
  open: boolean
  row: Row | null
  columns: Column[]
  onClose: () => void
  onSave: (updatedData: Partial<Row>) => void
  onDelete: () => void
}

export interface ICreateOrder {
  open: boolean
  onClose: () => void
  onSave: (newOrder: Row) => void
}

export interface IDataTable {
  columns: Column[]
  rows: Row[]
  onEdit: (id: number | string, updatedRow: Partial<Row>) => void
  onDelete: (id: number | string) => void
}
