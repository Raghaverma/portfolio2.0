
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { createDevTrackr, DevTrackrRateLimitError } from 'devtrackr'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

// Cached function to fetch GitHub data
const getCachedGitHubData = unstable_cache(
    async () => {
        if (!process.env.GITHUB_TOKEN) {
            throw new Error("GITHUB_TOKEN is missing")
        }

        const devtrackr = createDevTrackr({
            token: process.env.GITHUB_TOKEN
        })

        const [commits, langStats] = await Promise.all([
            devtrackr.getRecentCommits('Raghaverma', { perPage: 3 }),
            devtrackr.getLanguageStats('Raghaverma')
        ])

        return { commits, langStats }
    },
    ['github-data'],
    {
        revalidate: 3600, // Cache for 1 hour
        tags: ['github']
    }
)

export async function GET() {
    try {
        if (!process.env.GITHUB_TOKEN) {
            console.warn("GITHUB_TOKEN is missing")
            return NextResponse.json({ error: "Configuration Error: GITHUB_TOKEN is missing" }, { status: 500 })
        }

        const { commits, langStats } = await getCachedGitHubData()

        const formattedEvents = commits.map((commit: any) => {
            // Extract ID from URL if possible, otherwise generate/fallback
            const id = commit.commitUrl.split('/').pop()?.substring(0, 7) || 'latest'

            return {
                id: id,
                message: commit.message,
                repo: commit.repo,
                branch: 'main', // DevTrackr doesn't return branch yet
                author: 'Raghaverma',
                date: new Date(commit.committedAt).toLocaleDateString(),
                url: commit.commitUrl,
                stats: {
                    additions: commit.additions,
                    deletions: commit.deletions
                }
            }
        })

        // Map percentage to size for the frontend component
        const formattedLanguages = langStats.languages.map((lang: any) => ({
            name: lang.name,
            color: lang.color,
            size: lang.percentage // Frontend treats 'size' relative to total, effectively percentage
        }))

        return NextResponse.json({
            events: formattedEvents,
            languages: formattedLanguages.slice(0, 5)
        })

    } catch (error: any) {
        if (error instanceof DevTrackrRateLimitError) {
            console.error('DevTrackr Rate Limit:', error.resetAt)
            return NextResponse.json({
                error: 'Rate limit exceeded',
                resetAt: error.resetAt
            }, { status: 429 })
        }

        console.error('GitHub API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
