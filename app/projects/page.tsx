import { ProjectsSection } from "@/components/projects-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getProjects } from "@/lib/api"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects | Raghav Verma",
    description: "Portfolio of projects by Raghav Verma. Full-stack web applications built with Next.js, React, TypeScript, and modern technologies.",
    openGraph: {
        title: "Projects | Raghav Verma",
        description: "Portfolio of projects by Raghav Verma",
    },
}

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="group">
                        <Link href="/">
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
                <ProjectsSection projects={projects} />
            </div>
        </main>
    )
}
