import { ExperienceSection } from "@/components/experience-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getExperiences } from "@/lib/api"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Experience | Raghav Verma",
    description: "Professional experience and work history of Raghav Verma. Full-Stack Developer with 2+ years of experience at Hypeliv Solutions, Evallo, and more.",
    openGraph: {
        title: "Experience | Raghav Verma",
        description: "Professional experience and work history of Raghav Verma",
    },
}

export default async function ExperiencePage() {
    const experiences = await getExperiences()

    return (
        <main className="min-h-screen blueprint-grid pt-24 pb-16 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="group">
                        <Link href="/">
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
                <ExperienceSection experiences={experiences} />
            </div>
        </main>
    )
}
