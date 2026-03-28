'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8 shadow-2xl">
        <div className="flex items-center justify-center w-12 h-12 mb-6 bg-[#1a1a1a] rounded-full">
          <Lock className="w-6 h-6 text-white" />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Access Restricted</h1>
        <p className="mb-8 text-[#888888] text-sm">
          Protected directory. Authorization required to proceed.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" title="password" className="text-xs uppercase tracking-widest text-[#666666]">
              Admin Key
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-4 py-3 text-white focus:outline-none focus:border-[#333333] transition-colors placeholder:text-[#333333]"
                autoFocus
                required
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="absolute right-2 top-2 p-1.5 bg-[#1a1a1a] hover:bg-[#252525] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-[#ff4444] bg-[#ff44440a] border border-[#ff444422] rounded">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-8 border-t border-[#1a1a1a] text-[10px] text-[#444444] uppercase tracking-[0.2em] text-center">
          SYSTEM_VERSION: 1.0.0-PROD
        </div>
      </div>
    </div>
  )
}
