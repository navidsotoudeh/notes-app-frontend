import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { NextFetchEvent, NextResponse } from 'next/server'
import { MiddlewareFactory } from '@/middlewares/types'

export const withAuthentication: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (request.nextUrl.pathname.includes('/users')) {
      return NextResponse.redirect(new URL('/notes', request.url))
    }
  }
}

export const config = {
  matcher: ['/users', '/notes'],
}
