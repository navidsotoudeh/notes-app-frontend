import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/store'
import Layout from '@/components/layout/Layout'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export function NotesApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )
}
export default wrapper.withRedux(NotesApp)
