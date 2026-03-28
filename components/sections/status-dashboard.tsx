"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"

interface MusicData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  progress?: number
  duration?: number
}

function SpotifyCard() {
  const [data, setData] = useState<MusicData | null>(null)

  useEffect(() => {
    fetch("/api/music")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ isPlaying: false }))
  }, [])

  const progressPercent =
    data?.progress && data?.duration
      ? Math.min((data.progress / data.duration) * 100, 100)
      : 0

  return (
    <div className="h-full bg-[#f3f4f1] p-8 group hover:bg-[#edeeeb] hover:-translate-y-1 transition-all duration-500 cursor-default shadow-sm hover:shadow-md border border-transparent hover:border-[#afb3b0]/20">
      <div className="flex justify-between items-start mb-10">
        <a href="https://open.spotify.com/user/31pgsy5xe3cbxvvf3r7hxtluvy74" target="_blank" rel="noopener noreferrer">
          <Image src="/Spotify-Icon.svg" alt="Spotify" width={60} height={60} style={{ width: 60, height: 60 }} />
        </a>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#944a32] group-hover:scale-105 transition-transform">
          Now Playing
        </span>
      </div>

      {data ? (
        <div className="flex gap-4 items-start">
          {data.albumImageUrl && (
            <img
              src={data.albumImageUrl}
              alt={data.album || "Album art"}
              className="w-14 h-14 flex-shrink-0 object-cover"
            />
          )}
          <div className="min-w-0">
            <h3 className="font-headline text-xl mb-1 group-hover:text-[#944a32] transition-colors truncate">
              {data.title || "Nothing playing"}
            </h3>
            <p className="text-sm text-[#5c605d] truncate">{data.artist || "Open Spotify"}</p>
            {data.songUrl && (
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#944a32] mt-1 hover:underline"
              >
                {data.album} <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="h-5 bg-[#e0e3e0] animate-pulse rounded mb-2 w-3/4" />
          <div className="h-4 bg-[#e0e3e0] animate-pulse rounded w-1/2" />
        </div>
      )}

      <div className="mt-8">
        {data?.isPlaying ? (
          <div className="flex items-end gap-1 h-5">
            {[1, 0.8, 0.6, 0.4, 0.9].map((delay, i) => (
              <div
                key={i}
                className="w-1.5 bg-[#944a32] rounded-full music-bar"
                style={{
                  height: "100%",
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.6 + delay * 0.3}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="h-1 w-full bg-[#e0e3e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#944a32] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function AvailabilityCard() {
  return (
    <div className="h-full bg-[#f3f4f1] p-8 group hover:bg-[#edeeeb] hover:-translate-y-1 transition-all duration-500 cursor-default shadow-sm hover:shadow-md border border-transparent hover:border-[#afb3b0]/20">
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#944a32] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#944a32]">
            Available
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#655d59]">
          Status
        </span>
      </div>

      <h3 className="font-headline text-2xl mb-3 group-hover:text-[#944a32] transition-colors">
        Open for Work
      </h3>
      <p className="text-sm text-[#5c605d] leading-relaxed">
        Accepting freelance projects and full-time opportunities. Based in New Delhi, IST (UTC+5:30).
      </p>

      <div className="mt-8">
        <div className="h-1 w-full bg-[#e0e3e0] rounded-full overflow-hidden">
          <div className="h-full bg-[#944a32] w-full" />
        </div>
      </div>
    </div>
  )
}

export function StatusDashboard() {
  return (
    <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59]">
            Live System
          </span>
          <h2 className="font-headline text-4xl mt-2">Status Dashboard</h2>
        </div>
        <div className="h-px flex-1 bg-[#edeeeb] mx-8 mb-3 hidden md:block" />
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
        <StaggerItem className="h-full"><SpotifyCard /></StaggerItem>
        <StaggerItem className="h-full"><AvailabilityCard /></StaggerItem>
      </StaggerContainer>
    </section>
  )
}
