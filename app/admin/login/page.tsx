'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

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
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-scope flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Glassmorphism card */}
        <div
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "28px",
            boxShadow: "0 8px 40px rgba(100,100,160,0.13), 0 1.5px 0 rgba(255,255,255,0.8) inset",
            padding: "44px 40px 36px",
          }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center w-16 h-16 mb-8 mx-auto"
            style={{
              background: "linear-gradient(145deg, rgba(139,120,221,0.18), rgba(100,149,237,0.12))",
              border: "1px solid rgba(139,120,221,0.28)",
              borderRadius: "18px",
              boxShadow: "0 2px 12px rgba(139,120,221,0.14)",
            }}
          >
            <Lock className="w-7 h-7" style={{ color: "#6b6bb5" }} />
          </div>

          {/* Heading */}
          <div className="text-center mb-9">
            <h1
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: "#1e1e3a" }}
            >
              Admin Access
            </h1>
            <p className="text-sm font-medium" style={{ color: "#6b7280" }}>
              Enter your key to unlock the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[11px] font-bold uppercase tracking-widest block"
                style={{ color: "#7c83a0" }}
              >
                Security Key
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(139,120,221,0.22)",
                    borderRadius: "14px",
                    padding: "14px 58px 14px 18px",
                    fontSize: "16px",
                    color: "#1e1e3a",
                    outline: "none",
                    boxShadow: "0 1px 4px rgba(100,100,160,0.07) inset",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "rgba(107,107,181,0.55)"
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,120,221,0.13), 0 1px 4px rgba(100,100,160,0.07) inset"
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "rgba(139,120,221,0.22)"
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(100,100,160,0.07) inset"
                  }}
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  disabled={loading || !password}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: loading || !password
                      ? "rgba(107,107,181,0.3)"
                      : "linear-gradient(135deg, #8b78dd, #6495ed)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    cursor: loading || !password ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 10px rgba(107,107,181,0.28)",
                  }}
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  padding: "12px 16px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.22)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#b91c1c",
                  textAlign: "center",
                }}
              >
                {error}
              </motion.div>
            )}
          </form>

          {/* Footer */}
          <div
            className="mt-10 flex items-center justify-center gap-2 pt-6"
            style={{
              borderTop: "1px solid rgba(139,120,221,0.14)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9ca3af",
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#8b78dd" }} />
            Secure &bull; Encrypted
          </div>
        </div>
      </motion.div>
    </div>
  )
}
