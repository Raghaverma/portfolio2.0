import { getRecentTracks, getTrackInfo } from '@/lib/lastfm'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const response = await getRecentTracks()

        if (!response.ok) {
            console.error('Last.fm API Error:', response.status, response.statusText)
            return NextResponse.json({ isPlaying: false })
        }

        const data = await response.json()
        const tracks = data.recenttracks.track

        if (!tracks || tracks.length === 0) {
            return NextResponse.json({ isPlaying: false })
        }

        const track = tracks[0]
        const isPlaying = track['@attr']?.nowplaying === 'true'

        let duration = 0
        if (isPlaying) {
            const trackInfo = await getTrackInfo(track.artist['#text'], track.name)
            if (trackInfo?.track?.duration) {
                duration = parseInt(trackInfo.track.duration) / 1000 // Convert ms to seconds
            }
        }

        return NextResponse.json({
            isPlaying,
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            albumImageUrl: track.image.find((img: any) => img.size === 'large')?.['#text'] || track.image[0]['#text'],
            songUrl: track.url,
            duration,
            timestamp: Date.now() // Return current server time to help sync
        })

    } catch (error) {
        console.error('Last.fm API Error:', error)
        return NextResponse.json({ isPlaying: false })
    }
}
