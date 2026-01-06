import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"

const projects = [
  {
    name: "Boundary",
    description:
      "A resilient SDK to tame API chaos. Normalize responses, handle errors, and implement circuit breakers and retries without the boilerplate.",
    tech: ["TypeScript", "Node.js", "Resilience Patterns"],
    highlights: [
      "Reliability First: Built-in circuit breakers and smart retry strategies",
      "Data Normalization: Transform inconsistent API responses into predictable shapes",
      "Type-Safe: Full TypeScript support for robust integrations",
    ],
    github: "https://github.com/Raghaverma/Boundary",
    demo: "https://boundary.raghav-verma.com/",
  },
  {
    name: "DevTrackr",
    description:
      "A production-grade TypeScript SDK for extracting and normalizing GitHub developer signals.",
    tech: ["TypeScript", "Node.js", "GitHub API"],
    highlights: [
      "Type-Safe: Full TypeScript support with exported types",
      "Normalized Data: UI-ready JSON responses, no raw GitHub API responses",
      "Zero Dependencies: Uses native fetch only",
    ],
    github: "https://github.com/Raghaverma/DevTrackr-Docs",
    demo: "https://devtrackr.raghav-verma.com/",
  },
  {
    name: "Invoice Generator",
    description:
      "Built a React-based invoice creation tool with itemized items, quantity configuration, dynamic pricing, tax rates, and discounts. Enables PDF download using jspdf-react for seamless invoice generation.",
    tech: ["React", "JavaScript", "jspdf-react", "CSS"],
    highlights: [
      "Dynamic invoice creation with itemized billing and calculations",
      "Real-time tax and discount computation",
      "Export invoices as PDF directly to device",
    ],
    github: "https://github.com/Raghaverma/invoice-generator",
    demo: "https://invoice-generator-xi-nine.vercel.app",
  },
  {
    name: "Film Muse",
    description:
      "Built a Next.js web application for discovering and exploring movies with real-time search, responsive UI, and detailed movie information pages.",
    tech: ["Next.js", "TMDB API", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Integrated the TMDB API to fetch movies, genres, ratings, and trends",
      "Dynamic browsing and data-driven movie insights",
      "Responsive design with optimized performance",
    ],
    github: "https://github.com/Raghaverma/FilmMuse",
  },
  {
    name: "Expense Tracker",
    description:
      "Created personal finance manager in React.js with Tailwind CSS, helping expense entries, category filters, and analytics.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Reduced session load time by 20% through better state management",
      "Optimized lazy loading and improved performance",
      "Category-based filtering and analytics dashboard",
    ],
    github: "https://github.com/Raghaverma/expense-tracker",
    demo: "https://expense-tracker-psi-olive.vercel.app/",
  },
]

export function ProjectsSection() {
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
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-pretty">{highlight}</span>
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
