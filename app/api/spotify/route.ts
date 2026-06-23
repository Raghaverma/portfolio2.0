const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=6";

async function getAccessToken(): Promise<string> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Spotify env vars not configured");
  }
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: SPOTIFY_REFRESH_TOKEN }),
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

type SpotifyArtist = { name: string };
type SpotifyImage = { url: string };
type SpotifyTrackItem = {
  name: string;
  artists: SpotifyArtist[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify: string };
  explicit: boolean;
  preview_url: string | null;
  duration_ms: number;
};
type SpotifyRecentItem = { track: SpotifyTrackItem };

function mapTrack(item: SpotifyTrackItem) {
  return {
    name: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    album: item.album.name,
    albumArt: item.album.images[0]?.url ?? null,
    url: item.external_urls.spotify,
    explicit: item.explicit,
    previewUrl: item.preview_url ?? null,
    durationMs: item.duration_ms,
  };
}

function mapRecent(item: SpotifyRecentItem) {
  return {
    name: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    albumArt: item.track.album.images[1]?.url ?? item.track.album.images[0]?.url ?? null,
    url: item.track.external_urls.spotify,
    explicit: item.track.explicit,
  };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const [nowRes, recentRes] = await Promise.all([
      fetch(NOW_PLAYING_URL, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 0 } }),
      fetch(RECENT_URL, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 0 } }),
    ]);

    const recentJson = await recentRes.json() as { items: SpotifyRecentItem[] };
    const allRecent: SpotifyRecentItem[] = recentJson.items ?? [];

    if (nowRes.status === 204 || nowRes.status >= 400) {
      if (!allRecent.length) return Response.json({ isPlaying: false, progressMs: 0, track: null, recentTracks: [] });
      return Response.json({
        isPlaying: false,
        progressMs: 0,
        track: mapTrack(allRecent[0].track),
        recentTracks: allRecent.slice(1).map(mapRecent),
      });
    }

    const now = await nowRes.json() as { is_playing: boolean; progress_ms: number; item: SpotifyTrackItem };
    if (!now.item) return Response.json({ isPlaying: false, progressMs: 0, track: null, recentTracks: allRecent.slice(0, 4).map(mapRecent) });

    const recentTracks = allRecent
      .filter((r) => r.track.name !== now.item.name)
      .slice(0, 4)
      .map(mapRecent);

    return Response.json({
      isPlaying: now.is_playing,
      progressMs: now.progress_ms ?? 0,
      track: mapTrack(now.item),
      recentTracks,
    });
  } catch {
    return Response.json({ isPlaying: false, progressMs: 0, track: null, recentTracks: [] }, { status: 500 });
  }
}
