'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track in production or if not local
    if (window.location.hostname === 'localhost') return

    const track = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referer: document.referrer,
          }),
        })
      } catch (err) {
        // Silently fail to not affect user experience
        console.error('Failed to track visit:', err)
      }
    }

    // Small delay to ensure page is loaded
    const timer = setTimeout(track, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
