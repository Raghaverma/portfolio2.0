
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Katib API Response Interface (Corrected)
interface KatibCommit {
    repo: string
    additions: number
    deletions: number
    commitUrl: string
    committedDate: string
    oid: string
    messageHeadline: string
    messageBody: string
}

export async function GET() {
    try {
        const headers: HeadersInit = {
            'User-Agent': 'dictator-portfolio',
        }

        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
        } else {
            console.warn("GITHUB_TOKEN is missing")
            return NextResponse.json({ error: "Configuration Error: GITHUB_TOKEN is missing" }, { status: 500 })
        }

        const response = await fetch('https://katib.jasoncameron.dev/v2/commits/latest?username=Raghaverma&limit=3', {
            headers,
            next: { revalidate: 60 }
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Katib API Error:', response.status, errorText)
            return NextResponse.json({ error: `Katib API Error: ${response.status}`, details: errorText }, { status: response.status })
        }

        const rawData = await response.json()
        console.log("Katib Data:", JSON.stringify(rawData, null, 2)) // Debug log
        const commits: KatibCommit[] = Array.isArray(rawData) ? rawData : (rawData.commits || [])

        const formattedEvents = commits.map((commit) => {
            const repoParts = commit.repo.split('/')
            const repoName = repoParts[1] || commit.repo
            const author = repoParts[0] || 'Raghaverma'

            return {
                id: commit.oid.substring(0, 7),
                message: commit.messageHeadline,
                repo: repoName,
                branch: 'main',
                author: author,
                date: new Date(commit.committedDate).toLocaleDateString(),
                url: commit.commitUrl,
                stats: {
                    additions: commit.additions,
                    deletions: commit.deletions
                }
            }
        })

        return NextResponse.json(formattedEvents)
    } catch (error) {
        console.error('GitHub API Error:', error)
        return NextResponse.json([])
    }
}
