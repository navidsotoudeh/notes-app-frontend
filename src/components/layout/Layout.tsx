//libraries
import { useState } from 'react'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'

export default function Layout({ children }: any) {
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
