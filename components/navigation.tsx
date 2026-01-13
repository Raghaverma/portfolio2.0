"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView()
      setIsOpen(false)
    }
  }

  const navItems = [
    { id: "/", label: "Home" },
    { id: "/experience", label: "Experience" },
    { id: "/skills", label: "Skills" },
    { id: "/projects", label: "Projects" },
    { id: "/#contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-border" aria-label="Main navigation">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>
      <div className="glass-card">
        <div className="container mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold font-mono text-primary hover:text-primary/80 transition-colors"
              aria-label="Home"
            >
              {"<RV>"}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0 pt-4">
                  <SheetHeader className="px-6 text-left">
                    <SheetTitle className="font-mono text-primary text-xl">{"<RV />"}</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8 px-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.id}
                        onClick={() => setIsOpen(false)}
                        className="text-left text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
