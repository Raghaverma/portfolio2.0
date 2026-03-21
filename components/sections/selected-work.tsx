import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getProjects } from "@/lib/api"
import { PROJECT_CARDS } from "@/components/project-cards"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"

export async function SelectedWork() {
  const projects = await getProjects()
  const featured = projects.slice(0, 2)

  return (
    <section id="work" className="px-6 md:px-12 pb-32 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#944a32]">
          Portfolio
        </span>
        <h2 className="font-headline text-5xl mt-2 leading-tight">
          Selected Work &amp;{" "}
          <span className="serif-italic">Experimental Builds</span>
        </h2>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {featured.map((project, index) => (
          <StaggerItem
            key={project.name}
            className={`flex flex-col space-y-4 ${index === 1 ? "md:mt-32" : ""}`}
          >
            {/* Project SVG card */}
            {(() => {
              const Card = PROJECT_CARDS[project.name]
              return (
                <div className="relative aspect-[4/5] overflow-hidden group rounded-sm">
                  {Card ? <Card /> : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center">
                      <span className="font-headline text-4xl text-white/20">{project.name}</span>
                    </div>
                  )}
                  <div className="absolute top-8 right-8">
                    <span className="bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#2f3331]">
                      {index === 0 ? "Featured" : "Open Source"}
                    </span>
                  </div>
                </div>
              )
            })()}

            {/* Project info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="col-span-full sm:col-span-4 sm:border-r border-[#afb3b0]/30 pr-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#655d59] block mb-2">
                  Technologies
                </span>
                <div className="text-[11px] text-[#5c605d] font-medium leading-loose">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <div key={i}>{t}</div>
                  ))}
                </div>
              </div>
              <div className="col-span-full sm:col-span-8">
                <h3 className="font-headline text-2xl mb-3">{project.name}</h3>
                <p className="text-sm text-[#5c605d] leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4 mt-6">
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#944a32] hover:gap-4 transition-all"
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] hover:gap-4 transition-all"
                    >
                      GitHub <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-20 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 border border-[#afb3b0] text-[#5f5e5e] px-10 py-4 text-xs uppercase tracking-widest hover:border-[#944a32] hover:text-[#944a32] transition-all duration-300 group"
        >
          View All Projects
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>
    </section>
  )
}
