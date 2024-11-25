import { FC } from 'react'
import { Order } from '../../types/order.types'

const DetailedTableRow: FC<{ row: Order }> = ({ row }) => {
  return <div>Детальная информация товара: {row?.id}</div>
}

export default DetailedTableRow
