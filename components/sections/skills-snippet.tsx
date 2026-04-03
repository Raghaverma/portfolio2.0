import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"

const INTERFACE = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"]

const ARCHITECTURE = [
  { name: "Node.js",   level: "Fluent"     },
  { name: "Rust",      level: "Proficient" },
  { name: "REST APIs", level: "Advanced"   },
  { name: "PostgreSQL",level: "Proficient" },
]

const TOOLS = ["Git & GitHub", "Docker", "Vercel", "Prisma", "Python", "CLI Tooling", "AI Agents", "CI/CD"]

export function SkillsSnippet() {
  return (
    <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59]">
              Craft
            </span>
            <h2 className="font-headline text-4xl mt-2">
              The <span className="serif-italic">Stack.</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-[#edeeeb] mx-8 mb-3 hidden md:block" />
          <Link
            href="/experience#stack"
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] transition-colors mb-3"
          >
            Full Arsenal <ArrowUpRight size={12} />
          </Link>
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Interface — spans 5 cols */}
        <StaggerItem className="md:col-span-5 bg-[#f3f4f1] p-8 flex flex-col justify-between min-h-[260px]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#944a32] block mb-4">
              Interface
            </span>
            <p className="font-headline text-2xl leading-snug text-[#2f3331]">
              Crafting editorial experiences — performant, tactile, precise.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {INTERFACE.map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-[#faf9f7] border border-[#e0e3e0] text-[10px] uppercase tracking-wider font-sans text-[#2f3331]"
              >
                {s}
              </span>
            ))}
          </div>
        </StaggerItem>

        {/* Architecture — spans 3 cols, dark */}
        <StaggerItem className="md:col-span-3 bg-[#2f3331] p-8 text-[#faf7f6] flex flex-col justify-between min-h-[260px]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#ffc8b8] block mb-4">
              Architecture
            </span>
            <p className="font-headline text-xl leading-snug text-[#faf7f6]">
              Systems &amp; backends built to scale.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {ARCHITECTURE.map((item) => (
              <div key={item.name} className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-sans text-xs uppercase tracking-wider">{item.name}</span>
                <span className="font-headline text-xs italic text-[#ffc8b8]">{item.level}</span>
              </div>
            ))}
          </div>
        </StaggerItem>

        {/* Tools — spans 4 cols */}
        <StaggerItem className="md:col-span-4 bg-[#edeeeb] p-8 flex flex-col justify-between min-h-[260px]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59] block mb-4">
              Infrastructure &amp; Tools
            </span>
            <p className="font-headline text-xl leading-snug text-[#2f3331]">
              Modern DevOps, runtimes, and developer tooling.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-8">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="text-[11px] uppercase tracking-wider font-sans text-[#5c605d] border-b border-[#afb3b0]/30 pb-1"
              >
                {t}
              </span>
            ))}
          </div>
        </StaggerItem>

      </StaggerContainer>
    </section>
  )
}
