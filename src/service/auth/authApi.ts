import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '@/store/slices/auth/authSlice'
import { setCookie } from 'cookies-next'
import Router from 'next/router'
import Cookies from 'js-cookie'

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
        Cookies.set('notesapp-accessToken', '654-rm-accessToken123456')
        // dispatch(userLoggedIn(data.accessToken))
        dispatch(setCredentials('654-rm-accessToken123456'))
        try {
          // const { data } = await queryFulfilled
          // // localStorage.setItem('notesapp-accessToken', data.accessToken)
          // setCookie('notesapp-accessToken', data.accessToken)
          // dispatch(userLoggedIn(data.accessToken))
        } catch {}
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        Router.push('/')
        console.log('38')
        dispatch(logOut())
        Cookies.remove('notesapp-accessToken')
        // try {
        //   const { data } = await queryFulfilled
        //   console.log(data)
        //   Router.push('/')
        //   dispatch(logOut())
        //   setTimeout(() => {
        //     dispatch(apiSlice.util.resetApiState())
        //   }, 1000)
        // } catch (err) {
        //   console.log(err)
        // }
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
  useSendLogoutMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailUserMutation,
  useChangeUserPasswordMutation,
} = authApi
