import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    console.log('**getState().auth.token***', getState().auth.token)
    const token = getState().auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const coreNotesAppApi = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Note', 'User'],
  endpoints: (builder) => ({}),
})
