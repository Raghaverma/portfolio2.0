import { SkillsSection } from "@/components/skills-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Skills | Raghav Verma",
    description: "Technical skills and expertise of Raghav Verma. Proficient in Next.js, React, TypeScript, Node.js, Tailwind CSS, and modern web development technologies.",
    openGraph: {
        title: "Skills | Raghav Verma",
        description: "Technical skills and expertise of Raghav Verma",
    },
}

export default function SkillsPage() {
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
                <SkillsSection />
            </div>
        </main>
    )
}
