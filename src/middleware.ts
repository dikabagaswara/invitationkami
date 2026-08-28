import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/invitations', '/settings']
const AUTH_PAGES = ['/login', '/register']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isAuthPage = AUTH_PAGES.some((page) => pathname === page)

  // Redirect unauthenticated users from protected routes
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', req.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|uploads|images).*)',
  ],
}
