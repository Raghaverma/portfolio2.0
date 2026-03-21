"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, BookOpen, Mail } from "lucide-react"

const NAV_ITEMS = [
  { href: "/#work", label: "Work", icon: LayoutGrid },
  { href: "/experience", label: "Exp", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/experience") return pathname === "/experience"
    if (href === "/contact") return pathname === "/contact"
    return pathname === "/"
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[#faf9f7]/90 backdrop-blur-xl border-t border-[#e0e3e0]/60 shadow-[0_-10px_30px_rgba(47,51,49,0.04)]">
      <div className="flex justify-around items-center px-4 pb-6 pt-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center px-6 py-2 rounded-lg transition-all ${
                active
                  ? "bg-[#f3f4f1] text-[#944a32]"
                  : "text-[#655d59] hover:text-[#944a32]"
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="font-sans uppercase text-[10px] tracking-[0.05em]">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
