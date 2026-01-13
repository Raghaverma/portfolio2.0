import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"

export interface Project {
  name: string
  description: string
  tech: string[]
  highlights: string[]
  github: string
  demo?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">&#123;Projects&#125;</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Real-world applications showcasing modern web development practices and performance optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard
              key={project.name}
              className="glass-card rounded-lg p-6 md:p-8 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-foreground/80 leading-relaxed mb-4 text-pretty">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tech || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="w-4 shrink-0 text-primary font-bold">→</span>
                    <span className="leading-relaxed text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 pt-4 border-t">
                <Button asChild variant="outline" size="sm">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                {project.demo && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
