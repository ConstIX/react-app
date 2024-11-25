export interface Order {
  id?: number
  customerName: string
  status: string
  date: string
  items: {
    id: string
    product: string
    quantity: number
    price: number
  }[]
  [key: string]: any
}
