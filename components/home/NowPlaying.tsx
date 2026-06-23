"use client";

import { useEffect, useRef, useState } from "react";

type Track = {
  name: string;
  artist: string;
  album: string;
  albumArt: string | null;
  url: string;
  explicit: boolean;
  previewUrl: string | null;
  durationMs: number;
};

type RecentTrack = {
  name: string;
  artist: string;
  albumArt: string | null;
  url: string;
  explicit: boolean;
};

type SpotifyData = {
  isPlaying: boolean;
  progressMs: number;
  track: Track | null;
  recentTracks: RecentTrack[];
};

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function extractDominantColor(img: HTMLImageElement): string | null {
  try {
    const c = document.createElement("canvas");
    c.width = 24; c.height = 24;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, 24, 24);
    const { data } = ctx.getImageData(0, 0, 24, 24);
    let bestScore = 0, best = [154, 94, 0];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      const lum = (max + min) / 510;
      const score = sat * (1 - Math.abs(lum - 0.5) * 2);
      if (score > bestScore) { bestScore = score; best = [r, g, b]; }
    }
    return bestScore > 0.08 ? `rgb(${best[0]},${best[1]},${best[2]})` : null;
  } catch { return null; }
}

function EqBars({ accent }: { accent: string }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[3, 6, 4, 8, 5, 7, 3].map((h, i) => (
        <span
          key={i}
          className="w-[2.5px] origin-bottom rounded-sm"
          style={{
            height: `${h * 2}px`,
            backgroundColor: accent,
            animation: `sp-eq ${0.48 + i * 0.07}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </span>
  );
}

function SpotifyLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [accent, setAccent] = useState("var(--color-amber)");
  const [hovered, setHovered] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevNameRef = useRef<string | null>(null);
  const progressRef = useRef({ progressMs: 0, fetchedAt: 0, isPlaying: false, durationMs: 0 });

  const fetchData = async () => {
    try {
      const json: SpotifyData = await fetch("/api/spotify").then((r) => r.json());
      if (json.track && prevNameRef.current && json.track.name !== prevNameRef.current) {
        setFlipping(true);
        setTimeout(() => setFlipping(false), 600);
        audioRef.current?.pause();
        audioRef.current = null;
        setPreviewPlaying(false);
        setAccent("var(--color-amber)");
      }
      prevNameRef.current = json.track?.name ?? null;
      progressRef.current = {
        progressMs: json.progressMs,
        fetchedAt: Date.now(),
        isPlaying: json.isPlaying,
        durationMs: json.track?.durationMs ?? 0,
      };
      setData(json);
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tick = () => {
      const { progressMs, fetchedAt, isPlaying, durationMs } = progressRef.current;
      if (!durationMs) return;
      const current = isPlaying
        ? Math.min(progressMs + (Date.now() - fetchedAt), durationMs)
        : progressMs;
      setDisplayProgress(current);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const togglePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = data?.track?.previewUrl;
    if (!url) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = 0.6;
      audioRef.current.onended = () => setPreviewPlaying(false);
    }
    if (previewPlaying) { audioRef.current.pause(); setPreviewPlaying(false); }
    else { audioRef.current.play(); setPreviewPlaying(true); }
  };

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const color = extractDominantColor(e.currentTarget);
    if (color) setAccent(color);
  };

  if (!data?.track) return null;
  const { isPlaying, track, recentTracks } = data;
  const progressPct = track.durationMs > 0 ? (displayProgress / track.durationMs) * 100 : 0;

  return (
    <>
      <style>{`
        @keyframes sp-eq {
          from { transform: scaleY(0.2); }
          to   { transform: scaleY(1); }
        }
        @keyframes sp-flip {
          0%   { transform: rotateY(0deg); }
          50%  { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        .sp-flip { animation: sp-flip 0.6s ease-in-out; }
      `}</style>

      <div
        className="relative overflow-hidden border border-line bg-base transition-colors duration-300"
        style={{ borderColor: hovered ? `color-mix(in srgb, ${accent} 50%, transparent)` : undefined }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Top bar (always visible) ────────────────────── */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <SpotifyLogo
            className="h-3.5 w-3.5 shrink-0 transition-colors duration-300"
            style={{ color: accent }}
          />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            {isPlaying ? "Now playing" : "Last played"}
          </span>
          {isPlaying && (
            <span className="shrink-0"><EqBars accent={accent} /></span>
          )}
          <span className="h-3 w-px shrink-0 bg-line-bright" />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-fg">
            {track.name}
          </span>
          {track.explicit && (
            <span className="shrink-0 border border-line-2 px-[4px] py-px font-mono text-[9px] text-faint">E</span>
          )}
          {/* Chevron — toggles recent tracks only */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 p-0.5 text-faint transition-colors hover:text-fg-soft"
            aria-label={expanded ? "Hide recent tracks" : "Show recent tracks"}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* ── Album art + info (always visible) ───────────── */}
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={togglePreview}
            disabled={!track.previewUrl}
            className="group/art relative h-[72px] w-[72px] shrink-0 overflow-hidden border border-line focus:outline-none disabled:cursor-default"
            aria-label={previewPlaying ? "Pause preview" : "Play 30s preview"}
          >
            {track.albumArt ? (
              <img
                src={track.albumArt}
                alt={track.album}
                width={72}
                height={72}
                crossOrigin="anonymous"
                onLoad={onImgLoad}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover/art:scale-110 ${flipping ? "sp-flip" : ""}`}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface-2">
                <span className="text-xl text-faint">♪</span>
              </div>
            )}
            {track.previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-void/65 opacity-0 transition-opacity duration-200 group-hover/art:opacity-100">
                {previewPlaying ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                    <rect x="6" y="4" width="4" height="16" fill={accent} rx="1" />
                    <rect x="14" y="4" width="4" height="16" fill={accent} rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill={accent} aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            )}
            {previewPlaying && (
              <div className="pointer-events-none absolute inset-0 border-2" style={{ borderColor: accent }} />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-[15px] font-bold leading-snug transition-colors duration-200"
              style={{ color: accent }}
              onClick={(e) => e.stopPropagation()}
            >
              {track.name}
            </a>
            <p className="mt-1 truncate text-sm text-muted">{track.artist}</p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-ghost">{track.album}</p>
          </div>
        </div>

        {/* ── Progress bar + timestamps (always visible) ───── */}
        {track.durationMs > 0 && (
          <div className="px-4 pb-4">
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-linear"
                style={{ width: `${progressPct}%`, backgroundColor: accent }}
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-faint">
              <span>{fmt(displayProgress)}</span>
              <span>{fmt(track.durationMs)}</span>
            </div>
          </div>
        )}

        {/* ── Recent tracks (dropdown) ─────────────────────── */}
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight: expanded ? "400px" : "0px" }}
        >
          {recentTracks.length > 0 && (
            <div className="border-t border-line">
              <p className="px-4 pb-1.5 pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ghost">
                Recently played
              </p>
              {recentTracks.map((rt, i) => (
                <a
                  key={i}
                  href={rt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border-t border-line px-4 py-2.5 transition-colors hover:bg-surface/70"
                  onClick={(e) => e.stopPropagation()}
                >
                  {rt.albumArt ? (
                    <img src={rt.albumArt} alt="" width={28} height={28} className="h-7 w-7 shrink-0 object-cover" />
                  ) : (
                    <div className="h-7 w-7 shrink-0 bg-surface-2" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium leading-snug text-fg-soft">{rt.name}</p>
                    <p className="truncate font-mono text-[10px] text-faint">{rt.artist}</p>
                  </div>
                  {rt.explicit && (
                    <span className="shrink-0 border border-line px-[4px] font-mono text-[9px] text-ghost">E</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom shimmer */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>
    </>
  );
}
