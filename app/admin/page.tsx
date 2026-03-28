'use client'

import React, { useState, useEffect } from 'react'
import {
  Activity,
  Users,
  MessageSquare,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Clock,
  Cpu,
  Globe,
  HardDrive,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface ContactLog {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  ip: string
}

interface VisitLog {
  path: string
  timestamp: string
  ip: string
  userAgent: string
  referer: string
}

interface HealthData {
  checks: {
    [key: string]: { status: 'ok' | 'error' | 'unknown'; message: string }
  }
}

interface AdminData {
  contacts: ContactLog[]
  visits: VisitLog[]
  system: {
    platform: string
    uptime: number
    memory: { total: number; free: number }
    nodeVersion: string
  }
  env: { [key: string]: boolean }
  timestamp: string
}

// ─── Design tokens ─────────────────────────────────────────────────────────────
const glass = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(26px)",
  WebkitBackdropFilter: "blur(26px)",
  border: "1px solid rgba(255,255,255,0.68)",
  boxShadow: "0 6px 32px rgba(100,100,160,0.10), 0 1px 0 rgba(255,255,255,0.85) inset",
} as React.CSSProperties

const glassInner = {
  background: "rgba(255,255,255,0.28)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.55)",
  boxShadow: "0 2px 12px rgba(100,100,160,0.07)",
} as React.CSSProperties

const colors = {
  text: "#1e1e3a",
  muted: "#6b7280",
  subtle: "#9ca3af",
  accent: "#6b6bb5",
  accentLight: "rgba(139,120,221,0.12)",
  accentBorder: "rgba(139,120,221,0.22)",
  green: "#16a34a",
  greenBg: "rgba(22,163,74,0.09)",
  red: "#b91c1c",
  redBg: "rgba(239,68,68,0.09)",
  divider: "rgba(139,120,221,0.12)",
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function SectionCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...glass, borderRadius: "24px", ...style }}>
      {children}
    </div>
  )
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "22px 28px 18px",
        borderBottom: `1px solid ${colors.divider}`,
      }}
    >
      <Icon size={15} color={colors.accent} />
      <span style={{
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: colors.muted,
      }}>
        {title}
      </span>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null)
  const [health, setHealth] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const [dataRes, healthRes] = await Promise.all([
        fetch('/api/admin/data'),
        fetch('/api/admin/health'),
      ])
      if (dataRes.ok) setData(await dataRes.json())
      if (healthRes.ok) setHealth(await healthRes.json())
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div
        className="admin-scope flex flex-col items-center justify-center min-h-screen"
        style={{ color: colors.text }}
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ ...glass, borderRadius: "24px", padding: "28px", marginBottom: "20px" }}
        >
          <Activity size={32} color={colors.accent} />
        </motion.div>
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: colors.muted, fontWeight: 700 }}>
          Loading Dashboard…
        </p>
      </div>
    )
  }

  const memUsed = Math.round(((data?.system.memory.total ?? 0) - (data?.system.memory.free ?? 0)) / 1024 / 1024 / 1024 * 10) / 10
  const memTotal = Math.round((data?.system.memory.total ?? 0) / 1024 / 1024 / 1024)
  const memPct = Math.round((1 - (data?.system.memory.free ?? 0) / (data?.system.memory.total ?? 1)) * 100)
  const uptimeH = Math.floor((data?.system.uptime ?? 0) / 3600)
  const uptimeM = Math.floor(((data?.system.uptime ?? 0) % 3600) / 60)

  return (
    <div
      className="admin-scope"
      style={{ minHeight: "100vh", padding: "32px 24px 48px", maxWidth: "1280px", margin: "0 auto" }}
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "36px",
          paddingBottom: "28px",
          borderBottom: `1px solid ${colors.divider}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: colors.accentLight,
            border: `1px solid ${colors.accentBorder}`,
            borderRadius: "100px",
            padding: "4px 12px",
            width: "fit-content",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: colors.green, display: "inline-block",
            }} />
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", color: colors.accent, textTransform: "uppercase" }}>
              Live • v2.0.4
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: colors.text, letterSpacing: "-0.03em", margin: 0 }}>
            System Dashboard
          </h1>
          <p style={{ fontSize: "14px", color: colors.muted, fontWeight: 500, margin: 0 }}>
            Real-time analytics, infrastructure monitoring &amp; interaction logs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={fetchData}
            disabled={refreshing}
            style={{
              ...glassInner,
              borderRadius: "12px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.accent,
              cursor: "pointer",
              border: `1px solid ${colors.accentBorder}`,
            }}
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(239,68,68,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(239,68,68,0.22)",
              borderRadius: "12px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.red,
              cursor: "pointer",
            }}
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        {/* Row 1: stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          {/* Memory */}
          <SectionCard style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <HardDrive size={16} color={colors.accent} />
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted }}>Memory</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "14px" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, color: colors.text, lineHeight: 1 }}>{memUsed}GB</span>
              <span style={{ fontSize: "12px", color: colors.subtle, fontWeight: 600 }}>/ {memTotal}GB</span>
            </div>
            <div style={{ height: "6px", background: "rgba(139,120,221,0.12)", borderRadius: "99px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${memPct}%` }}
                style={{ height: "100%", background: "linear-gradient(90deg, #8b78dd, #6495ed)", borderRadius: "99px" }}
              />
            </div>
            <span style={{ fontSize: "11px", color: colors.muted, fontWeight: 600, marginTop: "6px", display: "block" }}>{memPct}% in use</span>
          </SectionCard>

          {/* Uptime */}
          <SectionCard style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Clock size={16} color={colors.accent} />
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted }}>Uptime</span>
            </div>
            <span style={{ fontSize: "30px", fontWeight: 800, color: colors.text, letterSpacing: "-0.02em" }}>
              {uptimeH}h {uptimeM}m
            </span>
          </SectionCard>

          {/* Total Visitors */}
          <SectionCard style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Globe size={16} color={colors.accent} />
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted }}>Visits</span>
            </div>
            <span style={{ fontSize: "30px", fontWeight: 800, color: colors.text, letterSpacing: "-0.02em" }}>
              {data?.visits.length ?? 0}
            </span>
          </SectionCard>

          {/* Messages */}
          <SectionCard style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <MessageSquare size={16} color={colors.accent} />
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted }}>Messages</span>
            </div>
            <span style={{ fontSize: "30px", fontWeight: 800, color: colors.text, letterSpacing: "-0.02em" }}>
              {data?.contacts.length ?? 0}
            </span>
          </SectionCard>
        </div>

        {/* Row 2: health + traffic */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
          {/* Health */}
          <SectionCard>
            <SectionHeader icon={ShieldCheck} title="Connectivity" />
            <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {health && Object.entries(health.checks).map(([service, check]) => (
                <div
                  key={service}
                  style={{
                    ...glassInner,
                    borderRadius: "14px",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: colors.muted }}>{service}</div>
                    <div style={{ fontSize: "12px", color: colors.subtle, marginTop: "2px" }}>{check.message}</div>
                  </div>
                  <span style={{
                    fontSize: "9px", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: "99px",
                    background: check.status === 'ok' ? colors.greenBg : check.status === 'error' ? colors.redBg : "rgba(156,163,175,0.12)",
                    color: check.status === 'ok' ? colors.green : check.status === 'error' ? colors.red : colors.subtle,
                    border: `1px solid ${check.status === 'ok' ? 'rgba(22,163,74,0.25)' : check.status === 'error' ? 'rgba(239,68,68,0.25)' : 'rgba(156,163,175,0.25)'}`,
                  }}>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Traffic */}
          <SectionCard style={{ overflow: "hidden" }}>
            <SectionHeader icon={Globe} title="Live Traffic Feed" />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(139,120,221,0.06)" }}>
                    {["Time", "Path", "Referer", "IP"].map(h => (
                      <th key={h} style={{ padding: "12px 22px", textAlign: "left", fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.muted }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!data?.visits.length ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "40px", textAlign: "center", fontSize: "13px", color: colors.subtle, fontStyle: "italic" }}>
                        No visits recorded yet.
                      </td>
                    </tr>
                  ) : data.visits.map((v, i) => (
                    <tr
                      key={i}
                      style={{ borderTop: `1px solid ${colors.divider}`, transition: "background 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(139,120,221,0.04)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 22px", fontSize: "12px", color: colors.muted, fontWeight: 600, whiteSpace: "nowrap" }}>
                        {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: "14px 22px" }}>
                        <span style={{
                          fontSize: "11px", fontWeight: 700, fontFamily: "monospace",
                          background: colors.accentLight, border: `1px solid ${colors.accentBorder}`,
                          borderRadius: "8px", padding: "3px 10px", color: colors.accent,
                        }}>
                          {v.path}
                        </span>
                      </td>
                      <td style={{ padding: "14px 22px", fontSize: "12px", color: colors.subtle, maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {v.referer === 'direct' ? 'Direct' : v.referer}
                      </td>
                      <td style={{ padding: "14px 22px", fontSize: "11px", fontFamily: "monospace", color: colors.muted, fontWeight: 600 }}>
                        {v.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Row 3: contact messages */}
        <SectionCard style={{ overflow: "hidden" }}>
          <SectionHeader icon={MessageSquare} title="Inbound Messages" />
          <div>
            {!data?.contacts.length ? (
              <div style={{ padding: "48px", textAlign: "center", fontSize: "13px", color: colors.subtle, fontStyle: "italic" }}>
                No messages received yet.
              </div>
            ) : data.contacts.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: "28px 32px",
                  borderTop: `1px solid ${colors.divider}`,
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "14px",
                      background: colors.accentLight, border: `1px solid ${colors.accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Users size={18} color={colors.accent} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "15px", color: colors.text }}>{c.name}</div>
                      <div style={{ fontSize: "12px", color: colors.muted, marginTop: "2px" }}>{c.email}</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
                    color: colors.subtle, background: colors.accentLight, border: `1px solid ${colors.accentBorder}`,
                    borderRadius: "99px", padding: "5px 14px",
                  }}>
                    {new Date(c.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <div style={{
                  marginLeft: "58px",
                  ...glassInner,
                  borderRadius: "16px",
                  padding: "18px 22px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: colors.text,
                }}>
                  {c.message}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "40px", textAlign: "center" }}>
        <div style={{
          ...glassInner,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 22px",
          borderRadius: "99px",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: colors.green, display: "inline-block" }} />
          <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted }}>
            Operational &bull; Secure
          </span>
        </div>
      </footer>
    </div>
  )
}
