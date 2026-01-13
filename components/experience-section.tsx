// experience-section.tsx
import { Briefcase, Calendar } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  highlights: string[]
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-primary">&#123;Experience&#125;</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Building high-performance web applications and contributing to innovative platforms that serve thousands of
            users.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <TiltCard key={idx} className="glass-card rounded-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{exp.location}</div>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-md w-fit">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-3">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-3 text-foreground/80">
                    <span className="w-4 shrink-0 text-primary font-bold">→</span>
                    <span className="leading-relaxed text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
