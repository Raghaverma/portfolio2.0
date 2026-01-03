
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const response = await fetch('https://api.github.com/users/Raghaverma/events', {
            headers: {
                'User-Agent': 'portfolio-app',
                'Accept': 'application/vnd.github.v3+json'
            },
            next: { revalidate: 60 }
        })

        if (!response.ok) {
            return NextResponse.json([])
        }

        const events = await response.json()

        const pushEvents = events.filter((e: any) =>
            e.type === 'PushEvent' &&
            e.payload?.commits &&
            e.payload.commits.length > 0
        ).slice(0, 3)

        const formattedCommits = pushEvents.map((e: any) => ({
            id: e.payload.commits[0]?.sha.substring(0, 7) || 'unknown',
            message: e.payload.commits[0]?.message || 'No commit message',
            author: e.actor.login,
            date: new Date(e.created_at).toLocaleDateString(),
            url: `https://github.com/${e.repo.name}/commit/${e.payload.commits[0]?.sha}`
        }))

        return NextResponse.json(formattedCommits)
    } catch (error) {
        console.error('GitHub API Error:', error)
        return NextResponse.json([])
    }
}
