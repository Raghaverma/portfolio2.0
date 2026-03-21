"use client"

import { StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"

const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "5+", label: "Projects Shipped" },
  { value: "∞", label: "Commits Pushed" },
  { value: "1", label: "Goal: Build Great Things" },
]

export function StatsBar() {
  return (
    <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-y border-[#e0e3e0]">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="text-center md:text-left">
              <div className="font-headline text-5xl md:text-6xl font-light text-[#2f3331] leading-none mb-2">
                {stat.value}
              </div>
              <div className="font-sans text-[10px] uppercase tracking-widest text-[#655d59]">
                {stat.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
