import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://0feadb5116d36907.mokky.dev' }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders'
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'PATCH',
        body: order
      })
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = ordersApi
