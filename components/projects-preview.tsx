import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"

const featuredProjects = [
    {
        name: "Boundary",
        description:
            "A resilient SDK to tame API chaos. Normalize responses, handle errors, and implement circuit breakers without the boilerplate.",
        tech: ["TypeScript", "Node.js", "Resilience Patterns"],
        github: "https://github.com/Raghaverma/Boundary",
        demo: "https://boundary.raghav-verma.com/",
    },
    {
        name: "DevTrackr",
        description:
            "A production-grade TypeScript SDK for extracting and normalizing GitHub developer signals.",
        tech: ["TypeScript", "Node.js", "GitHub API"],
        github: "https://github.com/Raghaverma/DevTrackr-Docs",
        demo: "https://devtrackr.raghav-verma.com/",
    },
    {
        name: "Invoice Generator",
        description:
            "Built a React-based invoice creation tool with itemized items, quantity configuration, dynamic pricing, and PDF export.",
        tech: ["React", "JavaScript", "jspdf-react"],
        github: "https://github.com/Raghaverma/invoice-generator",
        demo: "https://invoice-generator-xi-nine.vercel.app",
    },
]

export function ProjectsPreview() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured <span className="text-primary">&#123;Projects&#125;</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                            Real-world applications showcasing modern web development practices.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                        <Link href="/projects">
                            View All Projects
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {featuredProjects.map((project) => (
                        <TiltCard
                            key={project.name}
                            className="glass-card rounded-lg p-6 md:p-8 hover:shadow-xl transition-shadow flex flex-col"
                        >
                            <div className="mb-4">
                                <Link href="/projects" className="block group">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                                </Link>
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

                            <div className="flex gap-3 pt-4 border-t mt-auto">
                                <Button asChild variant="outline" size="sm">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4 mr-2" />
                                        Code
                                    </a>
                                </Button>
                                {project.demo && (
                                    <Button asChild variant="ghost" size="sm">
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Demo
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
