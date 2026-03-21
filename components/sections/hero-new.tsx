"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { InteractiveTerminal } from "@/components/sections/interactive-terminal"

export function HeroNew() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="inline-block px-3 py-1 bg-[#edeeeb] text-[#944a32] text-[10px] tracking-[0.2em] uppercase font-bold">
          Developer &amp; Architect
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-headline font-light tracking-tight leading-[0.9] text-[#2f3331]">
          Raghav{" "}
          <br />
          <span className="serif-italic font-medium text-[#944a32]">Verma</span>
        </h1>

        <p className="max-w-md text-lg text-[#5c605d] leading-relaxed">
          Building high-performance web applications through modern architecture,
          clean code, and intentional design.
        </p>

        <div className="flex flex-wrap gap-4 items-center pt-2">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-[#5f5e5e] text-[#faf7f6] px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#944a32] transition-all duration-300 group"
          >
            Explore Works
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#afb3b0] text-[#5f5e5e] px-8 py-4 text-sm uppercase tracking-widest hover:border-[#944a32] hover:text-[#944a32] transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Right column — Terminal */}
      <div className="lg:col-span-7 lg:mt-12">
        <InteractiveTerminal />
      </div>
    </section>
  )
}
