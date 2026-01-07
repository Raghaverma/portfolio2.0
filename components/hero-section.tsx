"use client"

import { Terminal, Github, Linkedin, Mail, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useMediaQuery } from "@/hooks/use-media-query"

const terminalCommands = [
  { cmd: "$ whoami", output: "Raghav Verma" },
  { cmd: "$ cat role.txt", output: "Software Engineer" },
  { cmd: "$ ls skills/", output: "Next.js TypeScript React.js Tailwind Node.js" },
  { cmd: "$ ping status", output: "Online • Open for freelance work" },
]

export function HeroSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section id="hero" className="min-h-screen flex flex-col md:justify-center relative pt-32 md:pt-24 pb-12 overflow-hidden">

      <div className="fixed top-24 right-8 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-mono text-muted-foreground">Available for Work</span>
      </div>

      {/* Meta info corners */}




      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8 md:mt-0">
          {/* Left side - Visual Output (Swapped) */}
          <div className="space-y-6 order-last lg:order-first">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="whitespace-normal md:whitespace-nowrap">Building Systems</span> <br />
                <span className="text-primary whitespace-normal md:whitespace-nowrap">Not Just Sites</span>
              </h1>
              <div className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                {isDesktop ? (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="cursor-pointer hover:text-primary transition-colors underline decoration-dotted underline-offset-4">
                        FullStack Developer
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@Raghaverma</h4>
                          <p className="text-sm text-muted-foreground">
                            Full-stack wizard building scalable web apps.
                          </p>
                          <div className="flex items-center pt-2">
                            <MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              New Delhi, India
                            </span>
                          </div>
                          <div className="flex items-center pt-1">
                            <Briefcase className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              Ex-Hypeliv Solutions
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <span className="text-foreground font-medium">FullStack Developer</span>
                )}{" "}
                with 2+ years of production experience building high-performance Next.js applications, reducing load times by 20-30% through optimized architecture and modern engineering practices.
              </div>
            </div>

            <div className="font-mono text-xs text-muted-foreground border-l-2 border-primary pl-4">
              <div className="mb-2 text-primary">// The Developer's Canvas</div>
              <div>Designing systems that scale.</div>
              <div>Writing code that matters.</div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <a href="https://cal.com/raghavermaa/potfolio" target="_blank" rel="noopener noreferrer">
                  <Mail className="w-4 h-4 mr-2" />
                  Book a Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/Raghaverma" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.linkedin.com/in/raghaverma/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Terminal (Swapped) */}
          <div className="space-y-8 lg:order-last">
            <div className="glass-card rounded-lg p-6 md:p-8 border shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm">terminal</span>
                <div className="flex gap-1.5 ml-auto">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="font-mono text-sm space-y-3 min-h-[280px]">
                {terminalCommands.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-primary">{item.cmd}</div>
                    <div className="text-foreground/80 pl-4">{item.output}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
