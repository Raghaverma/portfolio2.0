"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"
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

interface GitHubData {
  events?: Array<{
    message: string
    repo: string
    date: string
    url: string
  }>
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

function GitHubCard() {
  const [data, setData] = useState<GitHubData | null>(null)

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({}))
  }, [])

  const latest = data?.events?.[0]

  return (
    <div className="h-full bg-[#f3f4f1] p-8 group hover:bg-[#edeeeb] hover:-translate-y-1 transition-all duration-500 cursor-default shadow-sm hover:shadow-md border border-transparent hover:border-[#afb3b0]/20">
      <div className="flex justify-between items-start mb-10">
        <div className="p-3 bg-[#2f3331] group-hover:bg-[#5f5e5e] transition-colors duration-300">
          <Image
            src="/GitHub_Invertocat_Black.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="invert"
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#655d59]">
          Git Activity
        </span>
      </div>

      {latest ? (
        <div>
          <h3 className="font-headline text-xl mb-1 group-hover:text-[#5f5e5e] transition-colors truncate">
            {latest.message.length > 40
              ? latest.message.slice(0, 40) + "…"
              : latest.message}
          </h3>
          <p className="text-sm text-[#5c605d]">
            {latest.repo} •{" "}
            {latest.date
              ? new Date(latest.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "recently"}
          </p>
        </div>
      ) : data === null ? (
        <div>
          <div className="h-5 bg-[#e0e3e0] animate-pulse rounded mb-2 w-3/4" />
          <div className="h-4 bg-[#e0e3e0] animate-pulse rounded w-1/2" />
        </div>
      ) : (
        <div>
          <h3 className="font-headline text-xl mb-1">No recent commits</h3>
          <p className="text-sm text-[#5c605d]">Check GitHub for activity</p>
        </div>
      )}

      <div className="mt-8">
        <div className="h-1 w-full bg-[#e0e3e0] rounded-full overflow-hidden">
          <div className="bg-[#5f5e5e] h-full w-2/3 group-hover:w-3/4 transition-all duration-1000" />
        </div>
      </div>
    </div>
  )
}

function LocationCard() {
  const [time, setTime] = useState("")
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      )
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      try {
        const L = (await import("leaflet")).default
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link")
          link.id = "leaflet-css"
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }
        if (!mapContainerRef.current) return
        // Guard against React Strict Mode double-invoke: Leaflet stamps _leaflet_id on the DOM node
        if ((mapContainerRef.current as any)._leaflet_id) return
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          zoomControl: true,
          attributionControl: false,
          dragging: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
        }).setView([28.6139, 77.209], 11)

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
        }).addTo(mapInstanceRef.current)
      } catch (e) {
        console.error("Map init failed", e)
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="h-full bg-[#f3f4f1] group hover:bg-[#edeeeb] hover:-translate-y-1 transition-all duration-500 cursor-default shadow-sm hover:shadow-md border border-transparent hover:border-[#afb3b0]/20 overflow-hidden flex flex-col">
      <div ref={mapContainerRef} className="w-full flex-1 min-h-[140px] sm:min-h-[160px]" />
      <div className="p-6 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <MapPin size={12} className="text-[#944a32]" />
            <h3 className="font-headline text-base group-hover:text-[#944a32] transition-colors">
              New Delhi, IN
            </h3>
          </div>
          <p className="text-xs text-[#5c605d]">IST {time} · Open for work</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#944a32] group-hover:tracking-[0.2em] transition-all">
          Available
        </span>
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

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        <StaggerItem className="h-full"><SpotifyCard /></StaggerItem>
        <StaggerItem className="h-full"><GitHubCard /></StaggerItem>
        <StaggerItem className="h-full"><LocationCard /></StaggerItem>
      </StaggerContainer>
    </section>
  )
}
