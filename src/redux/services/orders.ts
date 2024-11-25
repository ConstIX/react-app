import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from '../../types/order.types'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://0feadb5116d36907.mokky.dev' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<{ meta: { total_items: number }; items: Order[] }, Record<string, string>>({
      query: ({ page, search, searchBy, date }) => `/orders${page}${searchBy}${search}${date}`,
      providesTags: ['Order']
    }),
    createOrder: builder.mutation<void, Partial<Order>>({
      query: (create) => ({
        url: `/orders`,
        method: 'POST',
        body: create
      }),
      invalidatesTags: ['Order']
    }),
    updateOrder: builder.mutation<void, Partial<Order>>({
      query: ({ id, ...order }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Order']
    })
  })
})

export const { useGetOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation } = ordersApi
