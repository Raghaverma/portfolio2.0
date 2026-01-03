"use client"

import { useState, useEffect } from "react"
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
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Asia/Kolkata"
            }))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="p-1 glass-card h-full min-h-[240px] relative overflow-hidden group">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm font-medium">Currently Based In</span>
            </div>

            {/* Map Placeholder - utilizing a dark abstract map look */}
            <div className="absolute inset-0 bg-zinc-900">
                <img
                    src="/delhi-map-dark.png"
                    alt="Map of Delhi"
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                <span className="font-mono text-xs text-muted-foreground">New Delhi, IN</span>
                <span className="font-mono text-xs text-primary tabular-nums">{time}</span>
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
}

function RecentCommitsCard() {
    const [commits, setCommits] = useState<Commit[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCommits() {
            try {
                const response = await fetch('/api/github')
                if (!response.ok) throw new Error('Failed to fetch')

                const formattedCommits = await response.json()
                setCommits(formattedCommits)
            } catch (error) {
                console.error("Error fetching commits:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCommits()
    }, [])

    return (
        <Card className="p-6 glass-card h-full flex flex-col min-h-[240px]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.66-3.795-1.455-3.795-1.455-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.245 1.83 1.245 1.05 1.785 2.76 1.275 3.435.975.105-.75.405-1.275.735-1.575-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.225 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.695.255 2.925.135 3.225.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="font-mono text-sm font-medium">Recent Commits</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">[live]</span>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Fetching GitHub data...
                    </div>
                ) : commits.length > 0 ? (
                    commits.map((commit, i) => (
                        <div key={i} className="group flex items-start justify-between gap-4 font-mono text-xs">
                            <div className="min-w-0">
                                <span className="text-muted-foreground mr-2">{commit.author}:</span>
                                <a href={commit.url} target="_blank" rel="noopener noreferrer" className="text-foreground truncate block sm:inline hover:underline underline-offset-4 hover:text-primary transition-colors">
                                    {commit.message}
                                </a>
                            </div>
                            <div className="flex gap-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                                {/* GitHub API events don't easily give stats without extra calls, so we omit +305 -23 to save rate limit */}
                                <span className="text-xs text-muted-foreground/50">{commit.id}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-muted-foreground">No recent public commits found.</div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <a
                    href="https://github.com/Raghaverma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                >
                    View on GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <div className="h-2 flex gap-0.5 rounded-full overflow-hidden w-24 sm:w-32 bg-secondary/30">
                    <div className="w-3/4 bg-[#3b82f6] h-full" />
                    <div className="w-1/6 bg-primary h-full" />
                    <div className="w-1/12 bg-[#22c55e] h-full" />
                </div>
            </div>
        </Card>
    )
}

function LatestPostsCard() {
    const posts = [
        { title: "Building Scalable Invoice Generators", date: "Jan 12, 2026", link: "#" },
        { title: "Optimizing Next.js for Performance", date: "Dec 28, 2025", link: "#" },
        { title: "The State of Frontend 2026", date: "Dec 15, 2025", link: "#" },
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
