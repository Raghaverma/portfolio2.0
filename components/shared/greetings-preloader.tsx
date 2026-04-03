"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface Greeting {
  text: string
  language: string
}

interface GreetingPreloaderProps {
  greetings?: Greeting[]
  intervalMs?: number
  fullPage?: boolean
}

const defaultGreetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "こんにちは", language: "Japanese" },
]

const SESSION_KEY = "preloader-shown"

export function GreetingPreloader({
  greetings = defaultGreetings,
  intervalMs = 800,
  fullPage = true,
}: GreetingPreloaderProps) {
  // Skip entirely if already shown this session
  const [skip] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true")
  const [index, setIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (skip || isComplete) return

    const timeout = setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex((prev) => prev + 1)
      } else {
        setIsComplete(true)
      }
    }, intervalMs)

    return () => clearTimeout(timeout)
  }, [skip, index, greetings.length, intervalMs, isComplete])

  useEffect(() => {
    if (isComplete && fullPage && containerRef.current) {
      sessionStorage.setItem(SESSION_KEY, "true")
      gsap.to(containerRef.current, {
        yPercent: -110,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none"
        },
      })
    }
  }, [isComplete, fullPage])

  if (skip) return null
  if (!fullPage && isComplete) return null

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf9f7] overflow-hidden ${
        !fullPage ? "relative h-20 w-full" : ""
      }`}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isComplete && (
            <motion.div
              key={index}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-4xl md:text-7xl font-extralight tracking-tighter text-[#2f3331]">
                {greetings[index].text}
              </h2>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#afb3b0]">
                {greetings[index].language}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
