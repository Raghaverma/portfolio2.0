'use client'

import React, { useState, useEffect } from 'react'
import { 
  Activity, 
  Users, 
  MessageSquare, 
  Server, 
  ShieldCheck, 
  LogOut, 
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  Globe
} from 'lucide-react'
import { useRouter } from 'next/navigation'

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
    [key: string]: { status: 'ok' | 'error' | 'unknown', message: string }
  }
}

interface AdminData {
  contacts: ContactLog[]
  visits: VisitLog[]
  system: {
    platform: string
    uptime: number
    memory: { total: number, free: number }
    nodeVersion: string
  }
  env: { [key: string]: boolean }
  timestamp: string
}

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
        fetch('/api/admin/health')
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
    const interval = setInterval(fetchData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Activity className="w-8 h-8 animate-pulse text-[#444444] mb-4" />
        <p className="text-xs uppercase tracking-[0.3em] text-[#666666]">Initializing System Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-12 border-b border-[#1a1a1a]">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#666666] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Terminal &bull; Production</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            System Overview
          </h1>
          <p className="text-[#888888] text-sm md:text-base max-w-xl">
            Real-time monitoring of application performance, user interactions, and service health status.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] rounded text-xs transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
            REFRESH
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff444411] hover:bg-[#ff444422] border border-[#ff444433] rounded text-xs text-[#ff6666] transition-colors"
          >
            <LogOut className="w-3 h-3" />
            TERMINATE SESSION
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Stats & Health */}
        <div className="lg:col-span-4 space-y-8">
          {/* System Health */}
          <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999999]">
                <Activity className="w-3 h-3" />
                Connectivity
              </h2>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              {health && Object.entries(health.checks).map(([service, check]) => (
                <div key={service} className="flex items-center justify-between p-3 bg-[#050505] border border-[#111111] rounded group hover:border-[#222222] transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-[#555555] mb-1">{service}</span>
                    <span className="text-xs text-[#888888]">{check.message}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                    check.status === 'ok' ? 'bg-[#00ff0011] text-[#00dd00]' : 
                    check.status === 'error' ? 'bg-[#ff000011] text-[#ff4444]' : 
                    'bg-[#44444411] text-[#444444]'
                  }`}>
                    {check.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* System Metrics */}
          <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded p-6">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999999] mb-6">
              <Cpu className="w-3 h-3" />
              Resources
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-[#050505] border border-[#111111] rounded">
                <span className="block text-[10px] uppercase tracking-widest text-[#555555] mb-2">Memory Usage</span>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xl font-mono text-white">
                    {Math.round(((data?.system.memory.total || 0) - (data?.system.memory.free || 0)) / 1024 / 1024 / 1024 * 10) / 10}GB
                  </span>
                  <span className="text-xs text-[#444444]">/ {Math.round((data?.system.memory.total || 0) / 1024 / 1024 / 1024)}GB Total</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white opacity-20 transition-all duration-500" 
                    style={{ width: `${Math.round((1 - (data?.system.memory.free || 0) / (data?.system.memory.total || 1)) * 100)}%` }} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#050505] border border-[#111111] rounded">
                <span className="text-[10px] uppercase tracking-widest text-[#555555]">Uptime</span>
                <span className="text-xs font-mono text-white">{Math.floor((data?.system.uptime || 0) / 3600)}H {Math.floor(((data?.system.uptime || 0) % 3600) / 60)}M</span>
              </div>
            </div>
          </section>

          {/* Configuration Status */}
          <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded p-6">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999999] mb-6">
              <Terminal className="w-3 h-3" />
              Environment
            </h2>
            <div className="flex flex-wrap gap-2">
              {data && Object.entries(data.env).map(([key, set]) => (
                <div key={key} title={set ? 'Variable configured' : 'Variable missing'} className={`px-2 py-1 border rounded text-[9px] uppercase tracking-widest transition-colors ${
                  set ? 'bg-[#222222] border-[#333333] text-[#ffffff]' : 'bg-transparent border-[#222222] text-[#444444]'
                }`}>
                  {key}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Activity */}
        <div className="lg:col-span-8 space-y-8">
          {/* Recent Visits */}
          <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded overflow-hidden">
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999999]">
                <Globe className="w-3 h-3" />
                Live Traffic
              </h2>
              <span className="text-[10px] text-[#444444]">Showing last 20 events</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#050505] border-b border-[#111111]">
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444]">Timestamp</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444]">Path</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444]">Referer</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444]">Origin IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111111]">
                  {data?.visits.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-xs text-[#444444] italic">
                        No traffic detected yet. System is clear.
                      </td>
                    </tr>
                  ) : (
                    data?.visits.map((visit, i) => (
                      <tr key={i} className="hover:bg-[#111111] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-xs text-[#888888]">
                            <Clock className="w-3 h-3 text-[#444444]" />
                            {new Date(visit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-[11px] px-2 py-0.5 bg-[#1a1a1a] rounded text-white">{visit.path}</code>
                        </td>
                        <td className="px-6 py-4 truncate max-w-[200px] text-[11px] text-[#666666]">
                          {visit.referer === 'direct' ? <span className="text-[#333333]">Direct Access</span> : visit.referer}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-mono text-[#555555]">{visit.ip}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Contacts */}
          <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded overflow-hidden">
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999999]">
                <MessageSquare className="w-3 h-3" />
                Inbound Queries
              </h2>
            </div>
            <div className="divide-y divide-[#111111]">
              {data?.contacts.length === 0 ? (
                <div className="p-12 text-center text-xs text-[#444444] italic">
                  Communications bay is empty. No new messages.
                </div>
              ) : (
                data?.contacts.map((contact) => (
                  <div key={contact.id} className="p-6 hover:bg-[#111111] transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#222222]">
                          <Users className="w-4 h-4 text-[#888888]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-0.5">{contact.name}</h3>
                          <p className="text-[11px] text-[#666666]">{contact.email} &bull; {contact.ip}</p>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#444444] font-mono">
                        {new Date(contact.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="pl-14">
                      <div className="p-4 bg-[#050505] border border-[#1a1a1a] rounded text-sm text-[#bbbbbb] leading-relaxed">
                        {contact.message}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-[#1a1a1a] text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#666666]">
            Server Active &bull; Last Pulse: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </footer>
    </div>
  )
}
