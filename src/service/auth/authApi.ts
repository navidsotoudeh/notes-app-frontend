import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '@/store/slices/auth/authSlice'
import { setCookie } from 'cookies-next'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: '/auth',
          method: 'POST',
          body: { ...user },
        }
      },
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        setCookie('notesapp-accessToken', '654-rm-accessToken123456')
        dispatch(userLoggedIn(data.accessToken))
        console.log('202020')
        try {
          // const { data } = await queryFulfilled
          // // localStorage.setItem('notesapp-accessToken', data.accessToken)
          // setCookie('notesapp-accessToken', data.accessToken)
          // dispatch(userLoggedIn(data.accessToken))
        } catch {}
      },
    }),
    sendPasswordResetEmailUser: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        }
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          },
        }
      },
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `loggeduser`,
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      },
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: 'changepassword',
          method: 'POST',
          body: actualData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      },
    }),
  }),
})

export const {
  useGetLoggedUserQuery,
  useResetPasswordMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailUserMutation,
  useChangeUserPasswordMutation,
} = authApi
