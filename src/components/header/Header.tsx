import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoginIcon, LogoutIcon } from '@heroicons/react/solid'
import { selectCurrentToken } from '../../store/slices/auth/authSlice'
import Router from 'next/router'

function Header() {
  // const token = useSelector(selectCurrentToken)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('notesapp-accessToken'))
  }, [])
  console.log('token', token)

  return (
    <div className="flex h-[50px] w-full items-center justify-between bg-white text-lg">
      <div className="flex w-5/12 justify-start px-4">
        {token ? (
          <div className="flex items-center justify-evenly gap-2">
            <LoginIcon className="h-6 w-6 hover:cursor-pointer" />
            <p>you are logged in</p>
          </div>
        ) : (
          <div
            className="flex items-center justify-evenly gap-2 hover:cursor-pointer"
            onClick={() => {
              Router.push('/login')
            }}
          >
            <LogoutIcon className="h-6 w-6" /> <p>you are logged out</p>
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
