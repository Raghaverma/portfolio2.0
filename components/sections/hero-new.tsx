"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { InteractiveTerminal } from "@/components/sections/interactive-terminal"

const quickFacts = [
  { label: "Current Role", value: "SDE Intern @ Khel.AI" },
  { label: "Location", value: "New Delhi, IN · IST" },
  { label: "Status", value: "● Available for work", highlight: true },
  { label: "Focus", value: "Next.js · TypeScript · APIs · UX" },
]

export function HeroNew() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top row — headline left, quick facts right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left — headline + value prop + CTAs */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-light tracking-tight leading-[0.9] text-[#2f3331]">
            Raghav{" "}
            <span className="serif-italic font-medium text-[#944a32]">Verma</span>
          </h1>

          <p className="max-w-md text-lg text-[#5c605d] leading-relaxed">
            Full-stack developer building production Next.js apps, APIs, and performance-focused interfaces.
          </p>

          <p className="max-w-md text-sm text-[#655d59] leading-relaxed -mt-4">
            Currently shipping sports analytics products at Khel.AI. Open to freelance and full-time roles.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-[#5f5e5e] text-[#faf7f6] px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#944a32] transition-all duration-300 group"
            >
              View Selected Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#afb3b0] text-[#5f5e5e] px-8 py-4 text-sm uppercase tracking-widest hover:border-[#944a32] hover:text-[#944a32] transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right — quick facts with micro interactions */}
        <div className="lg:col-span-5 lg:pt-2 hidden lg:block">
          <div className="space-y-0">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="group pl-6 py-5 border-l-2 border-[#e0e3e0] hover:border-[#944a32] hover:translate-x-1.5 transition-all duration-300 cursor-default"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#afb3b0] group-hover:text-[#944a32] transition-colors duration-300 block mb-1">
                  {fact.label}
                </span>
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#5c605d] group-hover:text-[#2f3331] transition-colors duration-300"
                  >
                    {fact.value}
                  </a>
                ) : (
                  <span className={`text-sm transition-colors duration-300 ${fact.highlight ? "text-[#944a32] font-medium" : "text-[#5c605d] group-hover:text-[#2f3331]"}`}>
                    {fact.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal — full width below */}
      <InteractiveTerminal />
    </section>
  )
}
