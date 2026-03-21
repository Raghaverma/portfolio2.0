"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    setVisible(true)

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        !!target.closest("a, button, [role='button'], input, textarea, select")
      )
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-multiply"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      >
        <div
          className="rounded-full bg-[#944a32] transition-all duration-150"
          style={{
            width: isHovering ? 12 : 8,
            height: isHovering ? 12 : 8,
            marginLeft: isHovering ? -2 : 0,
            marginTop: isHovering ? -2 : 0,
          }}
        />
      </div>

      {/* Ring */}
      <div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          transform: `translate(${pos.x - 20}px, ${pos.y - 20}px)`,
          transition: "transform 0.12s ease-out",
        }}
      >
        <div
          className="rounded-full border border-[#944a32]/40 transition-all duration-300"
          style={{
            width: isHovering ? 48 : 40,
            height: isHovering ? 48 : 40,
            marginLeft: isHovering ? -4 : 0,
            marginTop: isHovering ? -4 : 0,
          }}
        />
      </div>
    </>
  )
}
