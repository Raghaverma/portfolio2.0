const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const LASTFM_USERNAME = process.env.LASTFM_USERNAME

const LASTFM_ENDPOINT = `https://ws.audioscrobbler.com/2.0`

export const getRecentTracks = async () => {
    if (!LASTFM_API_KEY) console.error("Last.fm config error: LASTFM_API_KEY is missing")
    if (!LASTFM_USERNAME || LASTFM_USERNAME === 'your_username_here') console.error("Last.fm config error: LASTFM_USERNAME is missing or default")

    if (!LASTFM_API_KEY || !LASTFM_USERNAME || LASTFM_USERNAME === 'your_username_here') {
        throw new Error("Last.fm credentials missing")
    }

    const params = new URLSearchParams({
        method: 'user.getrecenttracks',
        user: LASTFM_USERNAME,
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: '1',
    })

    return fetch(`${LASTFM_ENDPOINT}?${params.toString()}`)
}

export const getTrackInfo = async (artist: string, track: string) => {
    if (!LASTFM_API_KEY) return null

    const params = new URLSearchParams({
        method: 'track.getInfo',
        api_key: LASTFM_API_KEY,
        artist: artist,
        track: track,
        format: 'json',
    })

    try {
        const res = await fetch(`${LASTFM_ENDPOINT}?${params.toString()}`)
        if (!res.ok) return null
        return res.json()
    } catch (e) {
        return null
    }
}
