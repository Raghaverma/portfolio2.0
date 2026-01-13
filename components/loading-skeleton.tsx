// components/loading-skeleton.tsx
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ExperiencePreviewSkeleton() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="glass-card p-8">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </Card>
            </div>
        </section>
    )
}

export function SkillsPreviewSkeleton() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Skeleton className="h-12 w-48 mx-auto mb-12" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
            </div>
        </section>
    )
}

export function ProjectsPreviewSkeleton() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Skeleton className="h-12 w-48 mx-auto mb-12" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="glass-card p-6">
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function FooterBentoSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-[240px]" />
                ))}
                <Skeleton className="lg:col-span-4 h-[200px]" />
            </div>
        </section>
    )
}

export function ContactSectionSkeleton() {
    return (
        <section className="py-10 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="glass-card p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
