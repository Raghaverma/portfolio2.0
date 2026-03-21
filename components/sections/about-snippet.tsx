import { ScrollReveal } from "@/components/shared/scroll-reveal"

export function AboutSnippet() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <ScrollReveal className="lg:col-span-2" direction="left">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59]">
            About
          </span>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-7" delay={0.1}>
          <p className="font-headline text-3xl md:text-4xl font-light leading-snug text-[#2f3331]">
            I&apos;m a{" "}
            <span className="serif-italic text-[#944a32]">
              full-stack developer
            </span>{" "}
            based in New Delhi, building digital products that are fast,
            accessible, and intentionally crafted — from architecture to the
            last pixel.
          </p>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-3" delay={0.2} direction="right">
          <div className="space-y-4 text-sm text-[#5c605d] leading-relaxed border-l-2 border-[#e0e3e0] pl-6">
            <p>
              Currently working as an SDE Intern at Khel.AI, building
              sports analytics platforms with computer vision and real-time
              video analysis.
            </p>
            <p>
              Pursuing MCA at VIPS-GGSIPU (2024–2026).
              Open to freelance projects and full-time opportunities.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
