"use client"

import { useEffect, useState } from "react"
import { Terminal, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const terminalCommands = [
  { cmd: "$ whoami", output: "Raghav Verma" },
  { cmd: "$ cat role.txt", output: "Freelance Developer @ Hypeliv Solutions" },
  { cmd: "$ ls skills/", output: "Next.js TypeScript React.js Tailwind Node.js" },
  { cmd: "$ ping status", output: "Online • Open for freelance work" },
]

export function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<"command" | "output">("command")

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= terminalCommands.length) return

    const currentCommand = terminalCommands[currentLine]
    const textToType = phase === "command" ? currentCommand.cmd : currentCommand.output

    if (displayedText.length < textToType.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText(textToType.slice(0, displayedText.length + 1))
        },
        phase === "command" ? 50 : 30,
      )
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        if (phase === "command") {
          setPhase("output")
          setDisplayedText("")
        } else {
          setPhase("command")
          setDisplayedText("")
          setCurrentLine((prev) => prev + 1)
        }
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, currentLine, phase])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 relative pt-16">
      {/* Meta info corners */}
      <div className="fixed top-20 left-8 font-mono text-xs text-muted-foreground hidden md:block z-40">
        <div>Server: Vercel Edge</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>Ping: 24ms</span>
        </div>
      </div>

      <div className="fixed top-20 right-8 font-mono text-xs text-muted-foreground hidden md:block z-40">
        <div>Build: Production</div>
        <div className="mt-1">Runtime: Node.js 20</div>
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left side - Terminal */}
        <div className="space-y-8">
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
              {terminalCommands.slice(0, currentLine).map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-primary">{item.cmd}</div>
                  <div className="text-foreground/80 pl-4">{item.output}</div>
                </div>
              ))}

              {currentLine < terminalCommands.length && (
                <div className="space-y-1">
                  {phase === "command" ? (
                    <div className="text-primary">
                      {displayedText}
                      {showCursor && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>}
                    </div>
                  ) : (
                    <>
                      <div className="text-primary">{terminalCommands[currentLine].cmd}</div>
                      <div className="text-foreground/80 pl-4">
                        {displayedText}
                        {showCursor && (
                          <span className="inline-block w-2 h-4 bg-foreground/80 ml-1 animate-pulse"></span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              <a href="mailto:work@raghav-verma.com">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
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

        {/* Right side - Visual Output */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance">
              Building
              <span className="block text-primary">Systems</span>
              Not Just Sites
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              FullStack Developer crafting scalable, performant web applications with modern architecture and
              engineering excellence.
            </p>
          </div>

          <div className="glass-card rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">New Delhi, India</div>
                <div className="text-sm text-muted-foreground">Available for remote opportunities</div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Current Role</div>
                  <div className="font-semibold">Freelance Developer</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Company</div>
                  <div className="font-semibold">Hypeliv Solutions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-muted-foreground border-l-2 border-primary pl-4">
            <div className="mb-2 text-primary">// The Developer's Canvas</div>
            <div>Designing systems that scale.</div>
            <div>Writing code that matters.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
