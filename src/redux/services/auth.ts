import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../types/user.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://0feadb5116d36907.mokky.dev',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`
    }),
    registerUser: builder.mutation<{ token: string; data: IUser }, Record<string, string>>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user
      })
    }),
    loginUser: builder.mutation<{ token: string; data: IUser }, Record<string, string>>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useGetUserByIdQuery, useRegisterUserMutation, useLoginUserMutation } = authApi
