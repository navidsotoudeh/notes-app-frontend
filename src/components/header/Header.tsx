import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoginIcon, LogoutIcon } from '@heroicons/react/solid'

import Router from 'next/router'

function Header() {
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth?.accessToken)

  return (
    <div className="flex h-[50px] w-full items-center justify-between bg-white text-lg">
      <div className="flex w-5/12 justify-start px-4">
        {accessToken ? (
          <div className="flex items-center justify-evenly gap-2">
            <LoginIcon className="h-6 w-6 hover:cursor-pointer" />
            <div>you are logged in</div>
          </div>
        ) : (
          <div
            className="flex items-center justify-evenly gap-2 hover:cursor-pointer"
            onClick={() => {
              Router.push('/login')
            }}
          >
            <LogoutIcon className="h-6 w-6" /> <div>you are logged out</div>
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
