import { NextResponse } from 'next/server'
import { logVisit } from '@/lib/admin-store'

export async function POST(request: Request) {
  try {
    const { path, referer } = await request.json()
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

    logVisit({
      path: path || 'unknown',
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer: referer || 'direct',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
