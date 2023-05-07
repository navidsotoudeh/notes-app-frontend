import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

//Redux
import { setCredentials } from '@/store/slices/auth/authSlice'
import { useDispatch } from 'react-redux'

//component
import Layout from '@/components/layout/Layout'

export function NotesApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    const initialAccessToken = Cookies.get('notesapp-accessToken')
    dispatch(setCredentials(initialAccessToken))
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )
}
export default wrapper.withRedux(NotesApp)
