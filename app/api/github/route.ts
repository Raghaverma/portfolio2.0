
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

        const relevantEvents = events.filter((e: any) =>
            ['PushEvent', 'CreateEvent', 'WatchEvent', 'PublicEvent', 'ForkEvent'].includes(e.type)
        ).slice(0, 3)

        const formattedEvents = relevantEvents.map((e: any) => {
            let message = 'Activity'
            let url = `https://github.com/${e.repo.name}`
            let id = e.id.substring(0, 7)

            switch (e.type) {
                case 'PushEvent':
                    if (e.payload.commits && e.payload.commits.length > 0) {
                        message = e.payload.commits[0].message
                        url = `https://github.com/${e.repo.name}/commit/${e.payload.commits[0].sha}`
                        id = e.payload.commits[0].sha.substring(0, 7)
                    } else {
                        message = `Pushed to ${e.payload.ref.replace('refs/heads/', '')}`
                    }
                    break
                case 'CreateEvent':
                    message = `Created ${e.payload.ref_type} ${e.payload.ref || e.repo.name}`
                    break
                case 'WatchEvent':
                    message = `Starred ${e.repo.name}`
                    break
                case 'ForkEvent':
                    message = `Forked ${e.repo.name}`
                    break
                case 'PublicEvent':
                    message = `Made ${e.repo.name} public`
                    break
            }

            return {
                id,
                message,
                author: e.actor.login,
                date: new Date(e.created_at).toLocaleDateString(),
                url
            }
        })

        return NextResponse.json(formattedEvents)
    } catch (error) {
        console.error('GitHub API Error:', error)
        return NextResponse.json([])
    }
}
