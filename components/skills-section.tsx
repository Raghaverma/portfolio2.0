import { TiltCard } from "@/components/ui/tilt-card"

const skills = {
  frontend: [
    "Next.js",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
  ],
  backend: [
    "Node.js",
    "Supabase",
    "SQL (PostgreSQL)",
    "REST APIs",
    "Python",
  ],
  devops: [
    "Docker",
    "Git",
    "CI/CD",
    "Vercel",
  ],
  soft: [
    "Commercial Awareness & Data Storytelling",
    "Execution Agility in Fast-Paced Environments",
    "Cross-Functional Influence & Relationship Building",
  ],
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-primary">&#123;Skills&#125;</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            A curated set of modern tools and frameworks for building exceptional web experiences.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Frontend */}
          <TiltCard className="glass-card rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary font-mono">&lt;Frontend /&gt;</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.frontend.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-secondary/50 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors font-mono text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Backend & DevOps Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard className="glass-card rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-primary font-mono">./Backend</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.backend.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-secondary/50 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors font-mono text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="glass-card rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-primary font-mono">DevOps_</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.devops.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-secondary/50 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors font-mono text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Soft Skills */}
          <TiltCard className="glass-card rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">★</span>
              Soft Skills
            </h3>
            <ul className="space-y-4">
              {skills.soft.map((skill) => (
                <li key={skill} className="flex gap-3 items-start">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span className="text-foreground/80 leading-relaxed text-pretty">{skill}</span>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>

        {/* Education */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <TiltCard className="glass-card rounded-lg p-6">
            <div className="text-sm text-primary font-mono mb-2">Current</div>
            <h4 className="font-bold text-lg mb-1">Masters in Computer Applications</h4>
            <div className="text-muted-foreground text-sm mb-2">
              Vivekananda Institute of Professional Studies, GGSIPU
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono">Oct 2024 - Present</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">CGPA: 7.4/10</span>
            </div>
          </TiltCard>

          <TiltCard className="glass-card rounded-lg p-6">
            <div className="text-sm text-muted-foreground font-mono mb-2">2021 - 2024</div>
            <h4 className="font-bold text-lg mb-1">Bachelors in Computer Applications</h4>
            <div className="text-muted-foreground text-sm mb-2">Bennett University</div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono">Oct 2021 - June 2024</span>
              <span className="px-2 py-1 bg-secondary rounded text-xs font-semibold">CGPA: 7.13/10</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
