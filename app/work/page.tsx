import { Navigation } from "@/components/layout/navigation"
import { SiteFooter } from "@/components/layout/site-footer"
import { getProjects } from "@/lib/api"
import { PROJECT_CARDS } from "@/components/project-cards"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work | Raghav Verma",
  description:
    "Work and projects by Raghav Verma — full-stack web applications built with Next.js, React, TypeScript, and modern technologies.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-24">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#655d59] mb-4">
            Portfolio
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-none text-[#2f3331]">
            All{" "}
            <span className="serif-italic font-light text-[#944a32]">
              Work.
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => {
            const Card = PROJECT_CARDS[project.name]
            return (
            <div key={project.name} className="flex flex-col space-y-6">
              <div className="relative aspect-video overflow-hidden group rounded-sm">
                {Card ? <Card /> : (
                  <div className="w-full h-full bg-[#111] flex items-center justify-center">
                    <span className="font-headline text-3xl text-white/20">{project.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-[#944a32]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {project.underConstruction && (
                  <div className="absolute top-3 right-3 bg-[#1a1208] border border-[#c8a96e]/60 text-[#c8a96e] text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                    Under Construction
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-headline text-2xl">{project.name}</h2>
                  {project.underConstruction && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6540] border border-[#7a6540]/40 px-2 py-0.5 rounded-sm">
                      wip
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#5c605d] leading-relaxed mb-4">
                  {project.underConstruction
                    ? "A repo-aware developer workflow agent. Details coming soon."
                    : project.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.npm && (
                    <Link
                      href={project.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#944a32] hover:gap-2 transition-all"
                    >
                      npm <ArrowUpRight size={12} />
                    </Link>
                  )}
                  {project.demo && !project.underConstruction && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#944a32] hover:gap-2 transition-all"
                    >
                      Live Demo <ArrowUpRight size={12} />
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] hover:gap-2 transition-all"
                    >
                      GitHub <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )})}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
