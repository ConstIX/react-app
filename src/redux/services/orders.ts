import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Row } from '../../types/order.types'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://0feadb5116d36907.mokky.dev' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<Row[], void>({
      query: () => '/orders',
      providesTags: ['Order']
    }),
    createOrder: builder.mutation<void, Partial<Row>>({
      query: (create) => ({
        url: `/orders`,
        method: 'POST',
        body: create
      }),
      invalidatesTags: ['Order']
    }),
    updateOrder: builder.mutation<void, Partial<Row>>({
      query: ({ id, ...order }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Order']
    })
  })
})

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = ordersApi
