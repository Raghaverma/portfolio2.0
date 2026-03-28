import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('admin_session')?.value
  const adminPassword = process.env.ADMIN_PASSWORD

  // Protect /admin pages (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!adminPassword || session !== adminPassword) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect /api/admin routes (except auth)
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth') {
    if (!adminPassword || session !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
