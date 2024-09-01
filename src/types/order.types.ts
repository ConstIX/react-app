interface Item {
  product: string
  quantity: number
  price: number
}

export interface Row {
  id?: number | string
  customerName: string
  orderNumber: string
  status: string
  createdDate: string
  items: Item[]
  [key: string]: any
}

interface Column {
  id: keyof Row
  label: string
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
