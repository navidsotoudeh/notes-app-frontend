import React from 'react'
import Link from 'next/link'
import { LoginIcon, LogoutIcon } from '@heroicons/react/solid'

function Header() {
  const isLogin = false
  return (
    <div className="flex h-[50px] w-full items-center justify-between bg-white text-lg">
      <div className="flex w-5/12 justify-start px-4">
        {isLogin ? (
          <div className="flex items-center justify-evenly gap-2">
            <LoginIcon className="h-6 w-6 hover:cursor-pointer" />
            <p>you are logged in</p>
          </div>
        ) : (
          <div className="flex items-center justify-evenly gap-2">
            <LogoutIcon className="h-6 w-6 hover:cursor-pointer" />{' '}
            <p>you are logged out</p>
          </div>
        )}
      </div>
      <div className="flex w-7/12 justify-start text-2xl font-bold text-purple-500">
        Tech notes app
      </div>
    </div>
  )
}

export default Header
