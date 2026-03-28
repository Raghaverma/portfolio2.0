"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/work") return pathname === "/work"
    if (href === "/experience") return pathname === "/experience"
    if (href === "/contact") return pathname === "/contact"
    return false
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#faf9f7]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(47,51,49,0.06)]">
        <nav className="flex justify-between items-center w-full px-8 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="font-headline italic text-xl text-[#5f5e5e] hover:text-[#944a32] transition-colors duration-300">
            <span>RV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans uppercase tracking-widest text-xs transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[#944a32] border-b-2 border-[#944a32] pb-0.5"
                    : "text-[#5f5e5e] hover:text-[#944a32]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons (desktop) */}
          <div className="hidden md:flex items-center gap-4 text-[#5f5e5e]">
            <Link
              href="https://github.com/Raghaverma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Image
                src="/GitHub_Invertocat_Black.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
            <Link href="mailto:raghav.verma.work@gmail.com" aria-label="Email">
              <Terminal size={20} className="hover:text-[#944a32] transition-colors" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#5f5e5e]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf9f7] pt-20 px-8 md:hidden">
          <div className="flex flex-col gap-8 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-headline text-3xl sm:text-4xl text-[#2f3331] hover:text-[#944a32] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-16 flex gap-6">
            <Link
              href="https://github.com/Raghaverma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-widest text-[#655d59] hover:text-[#944a32] transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/raghaverma/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-widest text-[#655d59] hover:text-[#944a32] transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
