import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export async function GET() {
    try {
        const res = await getNowPlaying()

        // 204 means nothing is currently playing
        if (res.status === 204 || res.status > 400) {
            // Fall back to recently played
            try {
                const recentRes = await getRecentlyPlayed()
                if (!recentRes.ok) return NextResponse.json({ isPlaying: false })

                const recentData = await recentRes.json()
                const item = recentData.items?.[0]?.track
                if (!item) return NextResponse.json({ isPlaying: false })

                return NextResponse.json({
                    isPlaying: false,
                    title: item.name,
                    artist: item.artists.map((a: any) => a.name).join(', '),
                    album: item.album.name,
                    albumImageUrl: item.album.images[0]?.url,
                    songUrl: item.external_urls.spotify,
                    duration: Math.floor(item.duration_ms / 1000),
                })
            } catch {
                return NextResponse.json({ isPlaying: false })
            }
        }

        const data = await res.json()

        if (!data?.item) return NextResponse.json({ isPlaying: false })

        const item = data.item

        return NextResponse.json({
            isPlaying: data.is_playing,
            title: item.name,
            artist: item.artists.map((a: any) => a.name).join(', '),
            album: item.album.name,
            albumImageUrl: item.album.images[0]?.url,
            songUrl: item.external_urls.spotify,
            duration: Math.floor(item.duration_ms / 1000),
            progress: Math.floor((data.progress_ms ?? 0) / 1000),
        })
    } catch (error) {
        console.error('Spotify API Error:', error)
        return NextResponse.json({ isPlaying: false })
    }
}
