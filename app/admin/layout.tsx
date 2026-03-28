import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import { Metadata } from "next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${jetbrainsMono.variable} font-mono min-h-screen bg-[#050505] text-[#e0e0e0] antialiased selection:bg-[#404040] selection:text-white`}>
      {children}
    </div>
  )
}
