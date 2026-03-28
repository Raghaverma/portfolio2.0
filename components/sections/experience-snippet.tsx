import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getExperiences } from "@/lib/api"
import { StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"

export async function ExperienceSnippet() {
  const experiences = await getExperiences()

  return (
    <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59]">
            Career
          </span>
          <h2 className="font-headline text-4xl mt-2">Experience</h2>
        </div>
        <div className="h-px flex-1 bg-[#edeeeb] mx-8 mb-3 hidden md:block" />
        <Link
          href="/experience"
          className="hidden md:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] transition-colors mb-3"
        >
          Full Timeline <ArrowUpRight size={12} />
        </Link>
      </div>

      <StaggerContainer className="divide-y divide-[#edeeeb]">
        {experiences.map((exp, i) => (
          <StaggerItem key={i}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase tracking-widest text-[#655d59] font-bold">
                  {exp.period}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-headline text-xl mb-1">{exp.title}</h3>
                <p className="text-sm font-medium text-[#944a32] mb-3">{exp.company} · {exp.location}</p>
                <p className="text-sm text-[#5c605d] leading-relaxed">
                  {exp.highlights[0]}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
