import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { password } = await request.json()
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
            return NextResponse.json(
                { error: 'Admin password not configured in environment' },
                { status: 500 }
            )
        }

        if (password === adminPassword) {
            // Set cookie for 7 days
            (await cookies()).set('admin_session', adminPassword, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    } catch (err) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
    }
}
