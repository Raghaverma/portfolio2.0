import { Briefcase, Calendar, ArrowRight } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recentExperience = {
    title: "Front-end Developer",
    company: "Hypeliv Solutions Pvt. Ltd",
    location: "Delhi NCR, IN",
    period: "August 2025 - January 2026",
    description: "Developed a Next.js + TypeScript trading and analytics platform, reducing load time by 20–30%. Built responsive Markets, Leaderboard, and Wallet pages."
}

export function ExperiencePreview() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Professional <span className="text-primary">&#123;Experience&#125;</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                            Building high-performance web applications.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                        <Link href="/experience">
                            View Full History
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <TiltCard className="glass-card rounded-lg p-6 md:p-8 hover:shadow-xl transition-shadow cursor-pointer group" >
                    <Link href="/experience">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{recentExperience.title}</h3>
                                <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                                    <Briefcase className="w-4 h-4" />
                                    <span>{recentExperience.company}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{recentExperience.location}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-md w-fit">
                                <Calendar className="w-4 h-4" />
                                {recentExperience.period}
                            </div>
                        </div>
                        <p className="text-foreground/80 leading-relaxed text-pretty">
                            {recentExperience.description}
                        </p>
                    </Link>
                </TiltCard>
            </div>
        </section>
    )
}
