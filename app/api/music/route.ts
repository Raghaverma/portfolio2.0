import { getRecentTracks, getTrackInfo } from '@/lib/lastfm'
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 30 // Revalidate every 30 seconds for music

// Cached function to fetch music data
// Shorter cache time (30s) since music changes frequently
const getCachedMusicData = unstable_cache(
    async () => {
        const response = await getRecentTracks()

        if (!response.ok) {
            console.error('Last.fm API Error:', response.status, response.statusText)
            return { isPlaying: false }
        }

        const data = await response.json()
        const tracks = data.recenttracks.track

        if (!tracks || tracks.length === 0) {
            return { isPlaying: false }
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

        return {
            isPlaying,
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            albumImageUrl: track.image.find((img: any) => img.size === 'large')?.['#text'] || track.image[0]['#text'],
            songUrl: track.url,
            duration,
            timestamp: Date.now()
        }
    },
    ['music-data'],
    {
        revalidate: 30, // Cache for 30 seconds
        tags: ['music']
    }
)

export async function GET() {
    try {
        const musicData = await getCachedMusicData()
        return NextResponse.json(musicData)
    } catch (error) {
        console.error('Last.fm API Error:', error)
        return NextResponse.json({ isPlaying: false })
    }
}
