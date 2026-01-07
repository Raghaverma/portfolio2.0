import { TiltCard } from "@/components/ui/tilt-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const topSkills = [
    "Next.js (2 years)",
    "TypeScript (2 years)",
    "React.js (3 years)",
    "Tailwind CSS (3 years)",
    "Node.js (2 years)",
    "Supabase (1 year)",
]

export function SkillsPreview() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Technical <span className="text-primary">&#123;Skills&#125;</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                            A curated set of modern tools and frameworks.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                        <Link href="/skills">
                            View All Skills
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <TiltCard className="glass-card rounded-lg p-6 md:p-8">
                    <Link href="/skills" className="block">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 hover:text-primary transition-colors">
                            <span className="text-primary font-mono">&lt;/&gt;</span>
                            Core Technologies
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {topSkills.map((skill) => (
                                <div
                                    key={skill}
                                    className="px-4 py-2 bg-secondary/50 rounded-md border border-border transition-colors font-mono text-sm"
                                >
                                    {skill}
                                </div>
                            ))}
                            <div className="px-4 py-2 bg-secondary/50 rounded-md border border-border transition-colors font-mono text-sm text-muted-foreground">
                                + more depending on scope
                            </div>
                        </div>
                    </Link>
                </TiltCard>
            </div>
        </section>
    )
}
