import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { NextFetchEvent, NextResponse } from 'next/server'
import { MiddlewareFactory } from '@/middlewares/types'
import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken'

// function isTokenExpired(token: string) {
//   const decoded = jwt.decode(token)
//   const now = Date.now() / 1000
//   return decoded && decoded.exp && decoded.exp < now
// }

export const withAuthentication: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const token = request.cookies.get('notesapp-accessToken')?.value ?? ''

    if (request.url.includes('/users') && !token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/users', '/notes'],
}
