//libraries
import { useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'

export default function Layout({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(true)

  return (
    <main className="min-w-screen flex min-h-screen flex-col bg-red-100">
      <Header />
      <div className="flex h-[calc(100vh_-_50px)] w-full bg-green-400">
        <Sidebar
          sidebarStatus={sidebarStatus}
          onClose={() => setSidebarStatus((prevState) => !prevState)}
        />
        <div className="h-full w-full">{children}</div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const cookieValue = req.cookies['notesapp-accessToken']

  const initialValue = { value: cookieValue } // Set your initial state object here

  const dispatch = useDispatch()
  dispatch(setInitialValue(initialValue))

  return {
    props: { initialValue },
  }
}
