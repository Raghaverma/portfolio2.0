import type React from "react"
import type { Metadata } from "next"
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SmoothScroll } from "@/components/shared/smooth-scroll"
import { CustomCursor } from "@/components/shared/custom-cursor"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-headline",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://raghav-verma.com"),
  alternates: { canonical: "https://raghav-verma.com" },
  title: "Raghav Verma | Full-Stack Developer",
  description:
    "Raghav Verma — Full-Stack Developer based in New Delhi, India. Specializing in Next.js, React, and TypeScript. Building high-performance web applications. Available for freelance and full-time opportunities.",
  keywords: [
    "Raghav Verma",
    "Raghav Verma developer",
    "Raghav Verma portfolio",
    "Full-Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Software Engineer",
    "full stack developer New Delhi",
    "Next.js developer India",
    "khel.ai",
    "sports tech developer",
    "Delhi",
    "India",
  ],
  authors: [{ name: "Raghav Verma", url: "https://raghav-verma.com" }],
  creator: "Raghav Verma",
  icons: {
    icon: [{ url: "/Dev.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghav-verma.com/",
    title: "Raghav Verma | Full-Stack Developer",
    description:
      "Full-Stack Developer building high-performance Next.js applications. Specializing in React, TypeScript, and modern web technologies.",
    siteName: "Raghav Verma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Verma | Full-Stack Developer",
    description: "Building high-performance web applications with Next.js, React, and TypeScript.",
    creator: "@Raghaverma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raghav Verma",
    url: "https://raghav-verma.com",
    jobTitle: "Full-Stack Developer",
    description: "Full-Stack Developer based in New Delhi, India, specializing in Next.js, React, and TypeScript",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Vivekananda Institute of Professional Studies – GGSIPU",
    },
    knowsAbout: [
      "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
      "Full-Stack Development", "Web Performance", "Computer Vision",
      "Sports Analytics",
    ],
    sameAs: [
      "https://github.com/Raghaverma",
      "https://www.linkedin.com/in/raghaverma/",
      "https://open.spotify.com/user/31pgsy5xe3cbxvvf3r7hxtluvy74",
    ],
  }

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden bg-[#faf9f7] text-[#2f3331]">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <MobileBottomNav />
        <Analytics />
      </body>
    </html>
  )
}
