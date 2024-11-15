import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IUser {
  username: string
  email: string
  password: string
  id: number
}

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
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user
      })
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useGetUserByIdQuery, useRegisterUserMutation, useLoginUserMutation } = authApi
