import { Navigation } from "@/components/layout/navigation"
import { SiteFooter } from "@/components/layout/site-footer"
import { ReadingProgress } from "@/components/shared/reading-progress"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal"
import { MagneticButton } from "@/components/shared/magnetic-button"
import { getExperiences } from "@/lib/api"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience | Raghav Verma",
  description:
    "Professional experience and work history of Raghav Verma. Full-Stack Developer specializing in Next.js, React, and TypeScript.",
}


export default async function ExperiencePage() {
  const experiences = await getExperiences()

  return (
    <>
      <ReadingProgress />
      <Navigation />
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <header className="mb-24 md:mb-32">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#655d59] mb-4">
              Curriculum Vitae
            </p>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-none text-[#2f3331]">
              Experience{" "}
              <span className="serif-italic font-light text-[#944a32]">
                &amp; Craft.
              </span>
            </h1>
          </header>
        </ScrollReveal>

        {/* Timeline */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40">
          <ScrollReveal className="lg:col-span-4" direction="left">
            <h2 className="font-headline text-3xl lg:sticky lg:top-32">
              Professional Journey
            </h2>
            <p className="mt-4 text-[#5c605d] max-w-xs leading-relaxed">
              A sequence of technical explorations and industry deployments,
              focused on frontend engineering and robust system architecture.
            </p>
          </ScrollReveal>

          <StaggerContainer className="lg:col-span-8 space-y-20">
            {experiences.map((exp) => (
              <StaggerItem key={exp.company} className="group relative">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="font-headline text-2xl group-hover:text-[#944a32] transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <span className="font-sans text-xs tracking-widest text-[#655d59]">
                    {exp.period}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#afb3b0] mb-2">
                      Company
                    </p>
                    <p className="text-xs text-[#5c605d] font-medium leading-relaxed">
                      {exp.company}
                      <br />
                      {exp.location}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <ul className="space-y-3">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-[#5c605d] leading-relaxed flex gap-3">
                          <span className="text-[#944a32] mt-1 flex-shrink-0">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Education */}
            <StaggerItem className="group relative opacity-60">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <h3 className="font-headline text-2xl group-hover:text-[#944a32] transition-colors duration-300">
                  Master of Computer Applications
                </h3>
                <span className="font-sans text-xs tracking-widest text-[#655d59]">
                  2024 — 2026
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#afb3b0] mb-2">
                    Institution
                  </p>
                  <p className="text-xs text-[#5c605d] font-medium">
                    Vivekananda Institute of Professional Studies, GGSIPU
                    <br />
                    New Delhi, IN
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[#5c605d] leading-relaxed">
                    Final semester. Focused on advanced software engineering, system design, and applied computing.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="group relative opacity-60">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <h3 className="font-headline text-2xl group-hover:text-[#944a32] transition-colors duration-300">
                  Bachelor of Computer Applications
                </h3>
                <span className="font-sans text-xs tracking-widest text-[#655d59]">
                  2021 — 2024
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#afb3b0] mb-2">
                    Institution
                  </p>
                  <p className="text-xs text-[#5c605d] font-medium">
                    Bennett University
                    <br />
                    Greater Noida, IN
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[#5c605d] leading-relaxed">
                    Foundations in computer science, programming, and software development.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* The Stack */}
        <section className="bg-[#f3f4f1] -mx-6 md:-mx-12 px-6 md:px-12 py-24 mb-40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="font-headline text-4xl mb-2">The Stack</h2>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#655d59]">
                Technical Arsenal &amp; Mastery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend - wide */}
              <div className="md:col-span-2 bg-[#edeeeb] p-10 flex flex-col justify-between min-h-[280px] group hover:bg-[#e6e9e6] transition-colors">
                <div>
                  <span className="text-[#944a32] text-3xl mb-6 block">◈</span>
                  <h3 className="font-headline text-3xl mb-4">Interface</h3>
                  <p className="text-[#5c605d] max-w-md">
                    Crafting editorial web experiences using React and Next.js,
                    prioritizing performance and tactile UI design.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
                    (s) => (
                      <MagneticButton key={s} strength={0.25}>
                        <span className="block px-3 py-1 bg-[#faf9f7] font-sans text-[10px] uppercase tracking-wider border border-[#e0e3e0]/50 hover:bg-[#944a32] hover:text-[#faf9f7] hover:border-[#944a32] transition-colors duration-300 cursor-default">
                          {s}
                        </span>
                      </MagneticButton>
                    )
                  )}
                </div>
              </div>

              {/* Backend - dark */}
              <div className="bg-[#2f3331] p-10 text-[#faf7f6] flex flex-col justify-between min-h-[280px] hover:bg-[#363c39] transition-colors duration-300">
                <div>
                  <span className="text-[#ffc8b8] text-3xl mb-6 block">▣</span>
                  <h3 className="font-headline text-3xl mb-4">Architecture</h3>
                  <p className="text-[#afb3b0] text-sm leading-relaxed">
                    Building resilient backends with Node.js. Focused on
                    scalability and type safety.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  {[
                    { name: "Node.js", level: "Fluent" },
                    { name: "REST APIs", level: "Advanced" },
                    { name: "PostgreSQL", level: "Proficient" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="group/row relative flex justify-between items-center border-b border-[#faf7f6]/10 pb-2"
                    >
                      <span className="font-sans text-[10px] uppercase tracking-widest group-hover/row:text-[#ffc8b8] transition-colors duration-300">
                        {item.name}
                      </span>
                      <span className="text-xs font-headline italic text-[#ffc8b8]">
                        {item.level}
                      </span>
                      <span className="absolute bottom-0 left-0 h-px bg-[#ffc8b8]/50 w-0 group-hover/row:w-full transition-all duration-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools - full width */}
              <div className="md:col-span-3 bg-[#edeeeb] p-10">
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <span className="text-[#944a32] text-3xl mb-4 block">◆</span>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#944a32]">
                      Infrastructure &amp; Tools
                    </h4>
                  </div>
                  <p className="text-[#5c605d] text-sm leading-relaxed max-w-xs text-right hidden md:block">
                    Modern DevOps practices — containerization, cloud deployments, and CI/CD pipelines.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#afb3b0]/20">
                  {[
                    { name: "Git & GitHub",   category: "Version Control" },
                    { name: "Docker",         category: "Containers"      },
                    { name: "Vercel",         category: "Deployment"      },
                    { name: "PostgreSQL",     category: "Database"        },
                    { name: "Prisma",         category: "ORM"             },
                    { name: "REST / GraphQL", category: "API Layer"       },
                    { name: "CI/CD",          category: "Automation"      },
                    { name: "shadcn/ui",      category: "UI Library"      },
                  ].map((tool) => (
                    <div
                      key={tool.name}
                      className="group/cell bg-[#edeeeb] hover:bg-[#2f3331] p-5 flex flex-col justify-between min-h-[100px] transition-colors duration-300 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#afb3b0] group-hover/cell:bg-[#ffc8b8] transition-colors duration-300 block" />
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-widest text-[#2f3331] group-hover/cell:text-[#faf7f6] transition-colors duration-300 leading-tight">
                          {tool.name}
                        </p>
                        <p className="font-headline text-[10px] italic text-[#944a32] group-hover/cell:text-[#ffc8b8] transition-colors duration-300 mt-1">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center border-t-2 border-[#edeeeb]">
          <h2 className="font-headline text-5xl md:text-7xl mb-8 leading-tight">
            Interested in{" "}
            <span className="serif-italic">collaboration?</span>
          </h2>
          <p className="text-[#5c605d] max-w-xl mx-auto mb-12 text-lg leading-relaxed">
            I&apos;m currently open to new challenges in web engineering. Let&apos;s
            discuss how we can build something exceptional.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#5f5e5e] text-[#faf7f6] px-10 py-5 font-sans text-xs uppercase tracking-[0.3em] hover:bg-[#944a32] transition-colors duration-500 group"
          >
            Initiate Inquiry
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
