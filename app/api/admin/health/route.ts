import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const checks = {
        spotify: { status: 'unknown' as 'ok' | 'error' | 'unknown', message: '' },
        github: { status: 'unknown' as 'ok' | 'error' | 'unknown', message: '' },
        email: { status: 'unknown' as 'ok' | 'error' | 'unknown', message: '' },
        groq: { status: 'unknown' as 'ok' | 'error' | 'unknown', message: '' },
    }

    // 1. Spotify Check
    if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
        try {
            const res = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                },
                body: new URLSearchParams({ grant_type: 'client_credentials' }),
            })
            if (res.ok) {
                checks.spotify = { status: 'ok', message: 'API access confirmed' }
            } else {
                checks.spotify = { status: 'error', message: `Auth error: ${res.status}` }
            }
        } catch (err: any) {
            checks.spotify = { status: 'error', message: err.message }
        }
    } else {
        checks.spotify = { status: 'error', message: 'Credentials missing' }
    }

    // 2. GitHub Check
    if (process.env.GITHUB_TOKEN) {
        try {
            const res = await fetch('https://api.github.com/user', {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
            })
            if (res.ok) {
                checks.github = { status: 'ok', message: 'API access confirmed' }
            } else {
                checks.github = { status: 'error', message: `Auth error: ${res.status}` }
            }
        } catch (err: any) {
            checks.github = { status: 'error', message: err.message }
        }
    } else {
        checks.github = { status: 'error', message: 'Token missing' }
    }

    // 3. Email Check (Resend)
    if (process.env.RESEND_API_KEY) {
        // We don't want to send a test email, just verify the key exists
        checks.email = { status: 'ok', message: 'Configuration exists' }
    } else {
        checks.email = { status: 'error', message: 'API key missing' }
    }

    // 4. Groq Check
    if (process.env.GROQ_API_KEY) {
        checks.groq = { status: 'ok', message: 'API key exists' }
    } else {
        checks.groq = { status: 'error', message: 'API key missing' }
    }

    return NextResponse.json({
        checks,
        timestamp: new Date().toISOString(),
    })
}
