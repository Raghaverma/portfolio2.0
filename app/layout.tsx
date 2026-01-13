import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CommandPalette } from "@/components/command-palette"
import { ScrollProgress } from "@/components/scroll-progress"
import { PageTransition } from "@/components/page-transition"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://raghav-verma.com'),
  title: "Raghav Verma | Full-Stack Developer & Software Engineer",
  description:
    "Full-Stack Developer with 2+ years of experience specializing in Next.js, React, and TypeScript. Building high-performance web applications with 20-30% faster load times. Available for freelance work and full-time opportunities.",
  generator: "v0.app",
  keywords: [
    "Raghav Verma",
    "Full-Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Software Engineer",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "Delhi",
    "India",
    "Freelance Developer",
    "Hire Developer",
  ],
  authors: [{ name: "Raghav Verma", url: "https://raghav-verma.com" }],
  creator: "Raghav Verma",
  publisher: "Raghav Verma",
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
    title: "Raghav Verma | Full-Stack Developer & Software Engineer",
    description: "Full-Stack Developer with 2+ years of experience building high-performance Next.js applications. Specializing in React, TypeScript, and modern web technologies.",
    siteName: "Raghav Verma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raghav Verma - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Verma | Full-Stack Developer",
    description: "Building high-performance web applications with Next.js, React, and TypeScript. 2+ years of production experience.",
    images: ["/og-image.png"],
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
  maximumScale: 1,
  userScalable: false,
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
    image: "https://raghav-verma.com/og-image.png",
    jobTitle: "Full-Stack Developer",
    description: "Full-Stack Developer with 2+ years of experience specializing in Next.js, React, and TypeScript",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Vivekananda Institute of Professional Studies",
      },
      {
        "@type": "EducationalOrganization",
        name: "Bennett University",
      },
    ],
    knowsAbout: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "Web Development",
      "Full-Stack Development",
    ],
    sameAs: [
      "https://github.com/Raghaverma",
      "https://www.linkedin.com/in/raghaverma/",
      "https://twitter.com/Raghaverma",
    ],
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <CommandPalette />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
