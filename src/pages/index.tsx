import { useEffect, useLayoutEffect } from 'react'
import { getCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { userLoggedOut } from '../store/slices/auth/authSlice'

export default function Home({ isAuthenticated }) {
  console.log('isAuthenticated', isAuthenticated)

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn)
  const router = useRouter()

  useLayoutEffect(() => {
    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!isAuthenticated || !isLoggedIn) {
      dispatch(userLoggedOut())
      router.push('/login')
    }
  }, [isAuthenticated, isLoggedIn])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world! This home page
      </h1>
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const cookie = getCookie('token', { req, res })
  if (!cookie) return { props: { isAuthenticated: false } }

  try {
    const isAuthenticated = await jwt.verify(
      cookie,
      process.env.NEXT_PUBLIC_JWT_KEY
    )
    return { props: { isAuthenticated: isAuthenticated } }
  } catch (err) {
    return { props: { isAuthenticated: false } }
  }
}
