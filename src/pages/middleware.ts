import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('notes-app')?.value
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err)
    }))
  if (request.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
    return
  }

  if (request.url.includes('/login') && verifiedToken) {
    return NextResponse.redirect(new URL('/users', request.url))
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/users', '/login'],
}
