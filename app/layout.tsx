import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Raghav Verma | Front-end Developer & Software Engineer",
  description:
    "Portfolio of Raghav Verma - Front-end Developer specializing in Next.js, React, and TypeScript. Building scalable web applications with modern technologies.",
  generator: "v0.app",
  keywords: [
    "Raghav Verma",
    "Front-end Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Raghav Verma" }],
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghav-verma.com/",
    title: "Raghav Verma | Front-end Developer & Software Engineer",
    description: "Portfolio of Raghav Verma - Front-end Developer specializing in Next.js, React, and TypeScript.",
    siteName: "Raghav Verma Portfolio",
    images: [
      {
        url: "/og-image.png", // User needs to provide this
        width: 1200,
        height: 630,
        alt: "Raghav Verma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Verma | Front-end Developer",
    description: "Building scalable web applications with Next.js and React.",
    images: ["/og-image.png"], // User needs to provide this
    creator: "@Raghaverma",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
