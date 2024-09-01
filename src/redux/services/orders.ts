import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://0feadb5116d36907.mokky.dev' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order']
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order']
    }),
    createOrder: builder.mutation({
      query: (create) => ({
        url: `/orders`,
        method: 'POST',
        body: create
      }),
      invalidatesTags: ['Order']
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: `/orders/${order.id}`,
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
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = ordersApi
