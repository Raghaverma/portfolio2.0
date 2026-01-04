
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Katib API Response Interface (Inferred)
interface KatibCommit {
    sha: string
    shortSha: string
    message: string
    htmlUrl: string
    committedDate: string
    repository: {
        name: string
        htmlUrl: string
        owner: {
            login: string
        }
    }
    stats: {
        total: number
        additions: number
        deletions: number
    }
}

export async function GET() {
    try {
        const headers: HeadersInit = {
            'User-Agent': 'dictator-portfolio',
        }

        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
        }

        const response = await fetch('https://katib.jasoncameron.dev/v2/commits/latest?username=Raghaverma&limit=3', {
            headers,
            next: { revalidate: 60 }
        })

        if (!response.ok) {
            console.error('Katib API Error:', response.status, await response.text())
            // Fallback empty
            return NextResponse.json([])
        }

        const rawData = await response.json()
        const commits: KatibCommit[] = Array.isArray(rawData) ? rawData : (rawData.commits || [])

        const formattedEvents = commits.map((commit) => ({
            id: commit.shortSha || commit.sha.substring(0, 7),
            message: commit.message,
            repo: commit.repository.name,
            branch: 'main', // Katib v2 implies 'latest' from default branch usually
            author: commit.repository.owner.login,
            date: new Date(commit.committedDate).toLocaleDateString(),
            url: commit.htmlUrl,
            stats: {
                additions: commit.stats?.additions || 0,
                deletions: commit.stats?.deletions || 0
            }
        }))

        return NextResponse.json(formattedEvents)
    } catch (error) {
        console.error('GitHub API Error:', error)
        return NextResponse.json([])
    }
}
