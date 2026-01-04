"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import {
    Github,
    MapPin,
    ArrowUpRight,
    MessageSquare,
    Check,
    Copy,
    ExternalLink,
    Info,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

function ThemeCard() {
    const { setTheme, theme } = useTheme()
    const [activeTheme, setActiveTheme] = useState("Frappe")
    const [bgEffect, setBgEffect] = useState(true)

    // Catppuccin-inspired palettes
    const palettes = [
        { name: "Rosewater", hex: "#f5e0dc" },
        { name: "Flamingo", hex: "#f2cdcd" },
        { name: "Pink", hex: "#f5c2e7" },
        { name: "Mauve", hex: "#cba6f7" },
        { name: "Red", hex: "#f38ba8" },
        { name: "Maroon", hex: "#eba0ac" },
        { name: "Peach", hex: "#fab387" },
        { name: "Yellow", hex: "#f9e2af" },
        { name: "Green", hex: "#a6e3a1" },
        { name: "Teal", hex: "#94e2d5" },
        { name: "Sky", hex: "#89dceb" },
        { name: "Sapphire", hex: "#74c7ec" },
        { name: "Blue", hex: "#89b4fa" },
        { name: "Lavender", hex: "#b4befe" }
    ]

    // Taking a subset of 8 colors for the grid
    const colors = palettes.slice(2, 10).map(p => p.hex)

    useEffect(() => {
        // Sync internal state with effective theme on mount
        if (theme === 'light') setTheme('dark') // Force dark if somehow light
        if (activeTheme === 'Latte') setActiveTheme('Frappe')
    }, [theme])

    const handleThemeChange = (selectedTheme: string) => {
        setActiveTheme(selectedTheme)
        setTheme("dark")
    }

    const handleColorChange = (hex: string) => {
        document.documentElement.style.setProperty('--primary', hex)
        // Also update ring color for consistency
        document.documentElement.style.setProperty('--ring', hex)
        toast.success("Accent color updated")
    }

    const toggleBgEffect = () => {
        const newVal = !bgEffect
        setBgEffect(newVal)
        const mainElement = document.querySelector('main')
        if (mainElement) {
            if (newVal) mainElement.classList.add('blueprint-grid')
            else mainElement.classList.remove('blueprint-grid')
        }
    }

    return (
        <Card className="p-6 flex flex-col justify-between glass-card h-full min-h-[240px]">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <span className="font-mono text-sm font-medium">Theme</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 p-1 bg-secondary/50 rounded-lg w-fit">
                    {["Frappe", "Macchiato", "Mocha"].map((t) => (
                        <button
                            key={t}
                            onClick={() => handleThemeChange(t)}
                            className={`px-3 py-1 rounded-md text-xs transition-all ${activeTheme === t
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                    {colors.map((color, i) => (
                        <button
                            key={i}
                            onClick={() => handleColorChange(color)}
                            className="h-8 rounded-md transition-transform hover:scale-110 duration-200 cursor-pointer border border-border/10 shadow-sm"
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div
                className="flex items-center gap-2 mt-auto cursor-pointer group"
                onClick={toggleBgEffect}
            >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${bgEffect ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                    {bgEffect && <Check className="w-3 h-3" />}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Background effect: <span className={bgEffect ? "text-foreground font-medium" : "text-muted-foreground"}>{bgEffect ? "on" : "off"}</span>
                </span>
            </div>
        </Card>
    )
}

function ConnectCard() {
    return (
        <Card className="p-6 flex flex-col justify-between glass-card h-full min-h-[240px]">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm font-medium">Let's Connect</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Always open to interesting projects and conversations. Let's build something exceptional together.
                </p>
            </div>
            <Button className="w-full group" variant="secondary" asChild>
                <a href="mailto:raghav.verma.work@gmail.com">
                    <span className="mr-2">Book a Chat</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
            </Button>
        </Card>
    )
}

function LocationCard() {
    const [currentTime, setCurrentTime] = useState("")
    const [isDaytime, setIsDaytime] = useState(true)
    const [isClient, setIsClient] = useState(false)
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const updateTime = () => {
            // Matching user's requested Delhi time logic
            const now = new Date();
            const delhiTime = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(now);
            setCurrentTime(delhiTime);

            const hour = parseInt(delhiTime.split(':')[0]);
            setIsDaytime(hour >= 6 && hour < 21);
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!isClient || !mapContainerRef.current || mapInstanceRef.current) return

        const initMap = async () => {
            try {
                const L = (await import('leaflet')).default
                // Import CSS manually or ensure it's in globals.css. 
                // Since we can't easily import CSS in component in Next.js App Router without global side effects,
                // we'll rely on a link tag or assume it's handled. 
                // However, for this snippet to work perfectly "out of the box", adding the link dynamically is safer.
                if (!document.getElementById('leaflet-css')) {
                    const link = document.createElement('link')
                    link.id = 'leaflet-css'
                    link.rel = 'stylesheet'
                    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
                    document.head.appendChild(link)
                }

                if (!mapContainerRef.current) return

                mapInstanceRef.current = L.map(mapContainerRef.current, {
                    zoomControl: false,
                    attributionControl: false,
                    dragging: true,
                    scrollWheelZoom: true,
                    doubleClickZoom: true,
                    boxZoom: true,
                    keyboard: true,
                    touchZoom: true
                }).setView([28.6139, 77.2090], 11); // Delhi

                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    maxZoom: 19,
                    attribution: '',
                    keepBuffer: 4,
                    updateWhenIdle: false,
                    updateWhenZooming: false
                }).addTo(mapInstanceRef.current);
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
    }, [isClient])

    const recenterMap = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([28.6139, 77.2090], 11);
        }
    }

    return (
        <Card className="p-4 flex flex-col justify-between glass-card h-full min-h-[240px] border-surface0 bg-base shadow-lg overflow-hidden group">
            <button
                onClick={recenterMap}
                className="text-foreground hover:text-primary mb-3 flex w-full cursor-pointer items-center gap-2 text-left text-sm font-semibold transition-colors z-10"
            >
                <MapPin size={16} className="text-primary" />
                Currently Based In 📍
            </button>
            <div className="bg-muted relative w-full flex-1 overflow-hidden rounded-lg z-0">
                <div ref={mapContainerRef} className="h-full w-full bg-zinc-900" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 z-10">
                <button
                    onClick={recenterMap}
                    className="text-muted-foreground hover:text-primary cursor-pointer text-xs whitespace-nowrap transition-colors font-mono"
                >
                    New Delhi, IN
                </button>
                {currentTime && (
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded">
                        {isDaytime ? (
                            <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                        ) : (
                            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                        )}
                        <span className="text-primary font-mono text-xs whitespace-nowrap tabular-nums">
                            {currentTime}
                        </span>
                    </div>
                )}
            </div>
        </Card>
    )
}

function SpotifyCard() {
    const [data, setData] = useState<{
        isPlaying: boolean;
        title?: string;
        artist?: string;
        album?: string;
        albumImageUrl?: string;
        songUrl?: string;
        duration?: number;
    } | null>(null);
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMusic() {
            try {
                const res = await fetch('/api/music')
                const newData = await res.json()

                setData(prev => {
                    // Reset progress if song changed
                    if (prev?.title !== newData.title) {
                        setProgress(0)
                    }
                    return newData
                })
            } catch (error) {
                console.error("Error fetching music", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMusic()
        const fetchDataInterval = setInterval(fetchMusic, 15000) // Poll every 15s

        // Local progress timer
        const progressInterval = setInterval(() => {
            setData(currentData => {
                if (currentData?.isPlaying && currentData.duration) {
                    setProgress(prev => {
                        if (prev >= currentData.duration!) return prev
                        return prev + 1
                    })
                }
                return currentData
            })
        }, 1000)

        return () => {
            clearInterval(fetchDataInterval)
            clearInterval(progressInterval)
        }
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <Card className="p-4 flex flex-col justify-center h-full min-h-[210px] bg-[#18181b] border-white/10 relative overflow-hidden group">
            {/* Header */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 z-20">
                <div className={`w-3.5 h-3.5 ${data?.isPlaying ? "text-[#1DB954]" : "text-white/40"}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.539.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </div>
                <span className={`font-bold text-[10px] tracking-wider uppercase font-sans ${data?.isPlaying ? "text-[#1DB954]" : "text-white/40"}`}>
                    {data?.isPlaying ? "Listening to Spotify" : "Last Played"}
                </span>
            </div>

            {/* Content Container */}
            <div className="flex items-center gap-3 relative z-10 mt-6 pl-1">
                {/* Album Art (Large) */}
                <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                    {data?.albumImageUrl ? (
                        <img
                            src={data.albumImageUrl}
                            alt={data.album || "Album Art"}
                            className={`w-[88px] h-[88px] rounded-lg shadow-lg object-cover bg-neutral-800 ${!data?.isPlaying && "grayscale sm:grayscale-0"}`}
                        />
                    ) : (
                        <div className="w-[88px] h-[88px] rounded-lg bg-neutral-800 flex items-center justify-center border border-white/5">
                            <div className="w-8 h-8 text-white/20">🎵</div>
                        </div>
                    )}
                </div>

                {/* Text Info */}
                <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                    <div className="font-bold text-sm text-white/90 hover:underline cursor-pointer truncate leading-tight">
                        {loading ? "Loading..." : (data?.title || "Not Playing")}
                    </div>
                    <div className="text-xs text-white/60 truncate leading-tight font-medium">
                        by <span className="hover:text-white transition-colors cursor-pointer">{loading ? "..." : (data?.artist || "Spotify")}</span>
                    </div>
                    <div className="text-xs text-white/60 truncate leading-tight font-medium">
                        on <span className="hover:text-white transition-colors cursor-pointer">{loading ? "..." : (data?.album || "System")}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar (Real) */}
            <div className="mt-4 space-y-1.5 z-10 pl-1">
                <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-1000 linear"
                        style={{
                            width: data?.duration
                                ? (data.isPlaying ? `${(progress / data.duration) * 100}%` : '100%')
                                : '0%',
                            opacity: data?.isPlaying ? 1 : 0.5
                        }}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-white/50 font-mono font-medium">
                    <span>{data?.isPlaying ? formatTime(progress) : (data?.duration ? formatTime(data.duration) : "0:00")}</span>
                    <span>{data?.duration ? formatTime(data.duration) : "0:00"}</span>
                </div>
            </div>

            {/* Background Image Effect */}
            {data?.albumImageUrl && (
                <div
                    className="absolute inset-0 z-0 opacity-10 bg-cover bg-center blur-2xl scale-150 transition-all duration-1000"
                    style={{ backgroundImage: `url(${data.albumImageUrl})` }}
                />
            )}
        </Card>
    )
}

interface Commit {
    id: string
    message: string
    author: string
    date: string
    url: string
    repo?: string
    branch?: string
    stats?: { additions: number; deletions: number }
}

function RecentCommitsCard() {
    const [commit, setCommit] = useState<Commit | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCommits() {
            try {
                const response = await fetch('/api/github')
                if (!response.ok) throw new Error('Failed to fetch')

                const formattedCommits = await response.json()
                if (formattedCommits.length > 0) {
                    setCommit(formattedCommits[0]) // Just show the latest one for the new design
                }
            } catch (error) {
                console.error("Error fetching commits:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCommits()
    }, [])

    return (
        <Card className="p-0 overflow-hidden glass-card h-full flex flex-col min-h-[240px] bg-[#0d1117] border-white/10 group">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Github className="w-4 h-4" />
                    <span className="font-mono">Recent Activity</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live
                </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Syncing with GitHub...
                    </div>
                ) : commit ? (
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-xs text-blue-400 font-mono mb-1.5 flex items-center gap-2">
                                    <span>{commit.repo || 'portfolio'}</span>
                                    <span className="text-gray-600">/</span>
                                    <span className="text-gray-400">{commit.branch || 'main'}</span>
                                </div>
                                <a href={commit.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed">
                                    {commit.message}
                                </a>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 shrink-0 border border-white/10 px-2 py-1 rounded bg-white/5">
                                {commit.id}
                            </span>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs font-mono">
                                <span className="text-emerald-400 flex items-center gap-1">
                                    +{commit.stats?.additions || 12}
                                </span>
                                <span className="text-red-400 flex items-center gap-1">
                                    -{commit.stats?.deletions || 5}
                                </span>
                            </div>
                            <div className="h-1.5 w-24 flex rounded-full overflow-hidden bg-white/10">
                                <div className="w-[60%] bg-[#3178c6]" title="TypeScript"></div>
                                <div className="w-[30%] bg-[#563d7c]" title="CSS"></div>
                                <div className="w-[10%] bg-[#f1e05a]" title="JavaScript"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-muted-foreground text-center">No recent activity found.</div>
                )}
            </div>

            <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>pnpm install</span>
                <span className="group-hover:text-blue-400 transition-colors">View on GitHub -&gt;</span>
            </div>
        </Card>
    )
}

function LatestPostsCard() {
    const posts = [
        { title: "Building Scalable Trading Platforms", date: "Jan 12, 2026", link: "#" },
        { title: "Optimizing React Performance: A Case Study", date: "Dec 28, 2025", link: "#" },
        { title: "The Architecture of Modern Web Apps", date: "Dec 15, 2025", link: "#" },
    ]

    return (
        <Card className="p-6 glass-card h-full flex flex-col min-h-[240px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm font-medium">Latest Posts</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                {posts.map((post, i) => (
                    <a key={i} href={post.link} className="group flex items-center justify-between border-b border-border/30 last:border-0 py-2 hover:bg-secondary/20 -mx-2 px-2 rounded transition-colors cursor-pointer">
                        <span className="font-medium text-sm truncate pr-4 group-hover:text-primary transition-colors">{post.title}</span>
                        <span className="font-mono text-xs text-muted-foreground shrink-0">{post.date}</span>
                    </a>
                ))}
            </div>
        </Card>
    )
}

export function FooterBento() {
    return (
        <section id="activity-dashboard" className="py-20 px-4 md:px-8 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
                {/* Row 1 */}
                <div className="lg:col-span-1 h-full">
                    <ThemeCard />
                </div>

                <div className="lg:col-span-1 h-full">
                    <ConnectCard />
                </div>

                <div className="lg:col-span-1 h-full">
                    <LocationCard />
                </div>

                {/* Spotify - spans 1 */}
                <div className="lg:col-span-1 h-full">
                    <SpotifyCard />
                </div>

                {/* Row 2 */}
                <div className="lg:col-span-2 h-full min-h-[200px]">
                    <RecentCommitsCard />
                </div>

                <div className="lg:col-span-2 h-full min-h-[200px]">
                    <LatestPostsCard />
                </div>
            </div>
        </section>
    )
}
