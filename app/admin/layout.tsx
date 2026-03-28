import type React from "react"
import { Inter } from "next/font/google"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Secure administrative console for the portfolio system.",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${inter.variable} font-sans min-h-screen antialiased`}
      style={{
        cursor: "auto",
        background: "linear-gradient(135deg, #e8edf5 0%, #dde4f0 40%, #e4dff0 100%)",
      }}
    >
      {/* Glassmorphism ambient blobs */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,120,221,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,149,237,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute",
          top: "40%",
          left: "35%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,180,255,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, cursor: "auto" }}>
        {children}
      </div>

      {/* Force native cursor everywhere in admin — highest specificity */}
      <style>{`
        .admin-scope, .admin-scope *, .admin-scope *::before, .admin-scope *::after {
          cursor: auto !important;
        }
        .admin-scope a,
        .admin-scope button,
        .admin-scope [role="button"],
        .admin-scope input,
        .admin-scope select,
        .admin-scope textarea,
        .admin-scope label[for] {
          cursor: pointer !important;
        }
        .admin-scope input[type="text"],
        .admin-scope input[type="password"],
        .admin-scope input[type="email"],
        .admin-scope textarea {
          cursor: text !important;
        }
        /* Kill the global cursor:none from globals.css */
        body { cursor: auto !important; }
        * { cursor: auto !important; }
        a, button, [role="button"] { cursor: pointer !important; }
        input[type="text"], input[type="password"], input[type="email"], textarea { cursor: text !important; }
      `}</style>
    </div>
  )
}
