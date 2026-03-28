import { NextResponse } from 'next/server'
import { getContacts, getVisits } from '@/lib/admin-store'
import os from 'os'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const contacts = getContacts()
        const visits = getVisits()

        // System information
        const system = {
            platform: os.platform(),
            uptime: os.uptime(),
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
            },
            nodeVersion: process.version,
        }

        // Environment key presence (not values)
        const env = {
            spotify: !!process.env.SPOTIFY_CLIENT_ID,
            github: !!process.env.GITHUB_TOKEN,
            email: !!process.env.RESEND_API_KEY,
            groq: !!process.env.GROQ_API_KEY,
            adminPassword: !!process.env.ADMIN_PASSWORD,
        }

        return NextResponse.json({
            contacts,
            visits,
            system,
            env,
            timestamp: new Date().toISOString(),
        })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}
