interface Item {
  id: string
  product: string
  quantity: number
  price: number
}

export interface Row {
  id: number | string
  customerName?: string
  status?: string
  date?: string
  items?: Item[]
  [key: string]: any
}

interface Column {
  id: keyof Row
  label?: string
  sortable?: boolean
}
export interface IDataTable {
  columns: Column[]
  rows: Row[]
  onDelete: (id: number | string) => void
}
