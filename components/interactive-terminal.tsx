"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Terminal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HistoryLine {
  id: number
  type: "command" | "output" | "error" | "success" | "info" | "ascii"
  content: string
}

// ASCII art for neofetch-style command
const ASCII_LOGO = [
  "    ____  _    __",
  "   / __ \\| |  / /",
  "  / /_/ /| | / / ",
  " / _, _/ | |/ /  ",
  "/_/ |_|  |___/   ",
]

const NEOFETCH_INFO = [
  "raghav@portfolio",
  "─────────────────",
  "OS: Next.js 15 + TypeScript",
  "Shell: Interactive Terminal v1.0",
  "Theme: Glass-Industrial",
  "Terminal: Custom React Component",
  "Packages: React, Tailwind, Framer Motion",
  "Uptime: Always online",
  "",
  "██████████████████ primary",
  "░░░░░░░░░░░░░░░░░░ background",
]

type CommandOutput = string | string[] | { type: "error" | "success" | "info" | "ascii"; content: string | string[] }

const commands: Record<string, CommandOutput | (() => CommandOutput)> = {
  help: [
    "╭─────────────────────────────────────╮",
    "│       Available Commands            │",
    "├─────────────────────────────────────┤",
    "│  whoami      → Display my name      │",
    "│  about       → Brief introduction   │",
    "│  skills      → Technical skills     │",
    "│  projects    → View my projects     │",
    "│  experience  → Work experience      │",
    "│  contact     → Contact information  │",
    "│  social      → GitHub & LinkedIn    │",
    "│  status      → Check availability   │",
    "├─────────────────────────────────────┤",
    "│  neofetch    → System info          │",
    "│  date        → Current date/time    │",
    "│  history     → Command history      │",
    "│  clear/cls   → Clear terminal       │",
    "╰─────────────────────────────────────╯",
  ],
  whoami: { type: "success", content: "Raghav Verma" },
  skills: [
    "├── Frontend",
    "│   ├── Next.js / React.js",
    "│   ├── TypeScript",
    "│   └── Tailwind CSS",
    "├── Backend",
    "│   ├── Node.js",
    "│   ├── REST APIs",
    "│   └── PostgreSQL / Firebase",
    "└── Tools",
    "    ├── Git / GitHub",
    "    ├── Vercel / Docker",
    "    └── VS Code",
  ],
  "ls skills/": [
    "├── Frontend",
    "│   ├── Next.js / React.js",
    "│   ├── TypeScript",
    "│   └── Tailwind CSS",
    "├── Backend",
    "│   ├── Node.js",
    "│   ├── REST APIs",
    "│   └── PostgreSQL / Firebase",
    "└── Tools",
    "    ├── Git / GitHub",
    "    ├── Vercel / Docker",
    "    └── VS Code",
  ],
  status: { type: "success", content: "● Online - Open for freelance work" },
  "ping status": { type: "success", content: "● Online - Open for freelance work" },
  "cat role.txt": "Software Engineer",
  about: [
    "Full-stack developer building production Next.js applications.",
    "",
    "I design clean, maintainable UI architectures, integrate APIs",
    "and authentication, debug real production issues, and deploy",
    "systems that users actually rely on.",
    "",
    "My work prioritizes performance, clarity, and reliability.",
  ],
  projects: [
    "╭─────────────────────────────────────────────╮",
    "│              My Projects                    │",
    "├─────────────────────────────────────────────┤",
    "│  ◆ Boundary      → API integration SDK      │",
    "│  ◆ DevTrackr     → GitHub signals SDK       │",
    "│  ◆ Pragya Med    → NEET diagnostic platform │",
    "│  ◆ FilmMuse      → Film discovery platform  │",
    "│  ◆ Major Realites→ Real estate platform     │",
    "│  ◆ Wroom Inc     → Product landing page     │",
    "╰─────────────────────────────────────────────╯",
    "",
    "Type 'open projects' to view in browser",
  ],
  experience: [
    "╭─────────────────────────────────────────────╮",
    "│            Work Experience                  │",
    "├─────────────────────────────────────────────┤",
    "│  Front-end Developer                        │",
    "│  Hypeliv Solutions Pvt. Ltd                 │",
    "│  Aug 2025 - Jan 2026 | Delhi NCR            │",
    "├─────────────────────────────────────────────┤",
    "│  • Reduced load times by 20-30%             │",
    "│  • Built Markets, Leaderboard, Wallet pages │",
    "│  • Next.js + TypeScript + real-time data    │",
    "╰─────────────────────────────────────────────╯",
  ],
  contact: [
    "╭─────────────────────────────────────╮",
    "│           Contact Me               │",
    "├─────────────────────────────────────┤",
    "│  📅 Book a call:                    │",
    "│  → cal.com/raghavermaa/potfolio    │",
    "│                                     │",
    "│  📍 Location: New Delhi, India      │",
    "╰─────────────────────────────────────╯",
  ],
  social: [
    "╭─────────────────────────────────────╮",
    "│           Social Links             │",
    "├─────────────────────────────────────┤",
    "│  GitHub:   github.com/Raghaverma   │",
    "│  LinkedIn: linkedin.com/in/raghaverma│",
    "╰─────────────────────────────────────╯",
  ],
  date: () => ({ type: "info", content: new Date().toLocaleString() }),
  pwd: "/home/raghav/portfolio",
  hostname: "raghav-portfolio",
  echo: { type: "info", content: "Usage: echo <message>" },
  // Easter eggs
  sudo: { type: "error", content: "Nice try! But you're not root here 😏" },
  "sudo rm -rf /": { type: "error", content: "🚨 Permission denied. The portfolio is protected!" },
  "rm -rf": { type: "error", content: "Whoa there! Let's not break anything 😅" },
  exit: { type: "info", content: "There's no escape... just kidding! Refresh the page 👋" },
  vim: { type: "error", content: "You're trapped! Press Ctrl+C to escape... oh wait, that doesn't work here 😄" },
  "": "",
  hello: { type: "success", content: "Hey there! 👋 Type 'help' to see what I can do." },
  hi: { type: "success", content: "Hello! Nice to meet you! Try typing 'about' to learn more." },
  hey: { type: "success", content: "Hey! Welcome to my portfolio terminal 🚀" },
  ls: [
    "about.txt    contact.md   projects/",
    "skills/      social.json  resume.pdf",
  ],
  cat: { type: "info", content: "Usage: cat <filename> (try 'cat role.txt')" },
  cd: { type: "info", content: "You're already home. Nowhere else to go! 🏠" },
  man: { type: "info", content: "No manual needed! Just type 'help' for commands." },
  "open projects": { type: "success", content: "Scroll down to see all projects, or visit #projects" },
  "open github": { type: "success", content: "Opening github.com/Raghaverma..." },
  "open linkedin": { type: "success", content: "Opening linkedin.com/in/raghaverma..." },
  matrix: { type: "ascii", content: "Wake up, Neo... The Matrix has you. Type 'help' to see the truth." },
  coffee: { type: "ascii", content: "☕ Here's your coffee! Now let's build something awesome." },
  "42": { type: "info", content: "The answer to life, the universe, and everything." },
}

// Command suggestions for typos
const commandSuggestions: Record<string, string> = {
  hep: "help",
  hlep: "help",
  helpp: "help",
  abut: "about",
  abuot: "about",
  projet: "projects",
  projcts: "projects",
  proects: "projects",
  skilsl: "skills",
  skils: "skills",
  contct: "contact",
  conact: "contact",
  socail: "social",
  soical: "social",
  stauts: "status",
  staus: "status",
  cler: "clear",
  claer: "clear",
  neofecth: "neofetch",
  nefetch: "neofetch",
  experince: "experience",
  expereince: "experience",
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryLine[]>([])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lineId, setLineId] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const getNextId = () => {
    const id = lineId
    setLineId((prev) => prev + 1)
    return id
  }

  const addLines = (lines: HistoryLine[]) => {
    setHistory((prev) => [...prev, ...lines])
  }

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const newLines: HistoryLine[] = []

    newLines.push({
      id: getNextId(),
      type: "command",
      content: `guest@raghav:~$ ${cmd}`,
    })

    // Clear commands
    if (trimmedCmd === "clear" || trimmedCmd === "cls") {
      setHistory([])
      return
    }

    // History command
    if (trimmedCmd === "history") {
      if (commandHistory.length === 0) {
        newLines.push({ id: getNextId(), type: "info", content: "No commands in history yet." })
      } else {
        commandHistory.forEach((c, i) => {
          newLines.push({ id: getNextId(), type: "output", content: `  ${i + 1}  ${c}` })
        })
      }
      addLines(newLines)
      return
    }

    // Neofetch command
    if (trimmedCmd === "neofetch" || trimmedCmd === "fastfetch") {
      newLines.push({ id: getNextId(), type: "ascii", content: "" })
      const maxLines = Math.max(ASCII_LOGO.length, NEOFETCH_INFO.length)
      for (let i = 0; i < maxLines; i++) {
        const logo = ASCII_LOGO[i] || "             "
        const info = NEOFETCH_INFO[i] || ""
        newLines.push({
          id: getNextId(),
          type: "ascii",
          content: `${logo}  ${info}`,
        })
      }
      addLines(newLines)
      return
    }

    // Echo command
    if (trimmedCmd.startsWith("echo ")) {
      const message = cmd.slice(5)
      newLines.push({ id: getNextId(), type: "output", content: message })
      addLines(newLines)
      return
    }

    // Check for typo suggestions
    if (!commands[trimmedCmd] && commandSuggestions[trimmedCmd]) {
      const suggestion = commandSuggestions[trimmedCmd]
      newLines.push({
        id: getNextId(),
        type: "error",
        content: `Command not found. Did you mean '${suggestion}'?`,
      })
      addLines(newLines)
      return
    }

    // Find matching command
    const output = commands[trimmedCmd]

    if (output !== undefined) {
      const result = typeof output === "function" ? output() : output

      if (typeof result === "string") {
        if (result !== "") {
          newLines.push({ id: getNextId(), type: "output", content: result })
        }
      } else if (Array.isArray(result)) {
        result.forEach((line) => {
          newLines.push({ id: getNextId(), type: "output", content: line })
        })
      } else if (typeof result === "object" && result !== null) {
        const content = result.content
        if (Array.isArray(content)) {
          content.forEach((line) => {
            newLines.push({ id: getNextId(), type: result.type, content: line })
          })
        } else {
          newLines.push({ id: getNextId(), type: result.type, content })
        }
      }
    } else if (trimmedCmd !== "") {
      // Find similar commands
      const allCommands = Object.keys(commands).filter(c => c !== "")
      const similar = allCommands.find(c => c.startsWith(trimmedCmd.slice(0, 3)))

      newLines.push({
        id: getNextId(),
        type: "error",
        content: similar
          ? `Command '${cmd}' not found. Did you mean '${similar}'?`
          : `Command '${cmd}' not found. Type 'help' for available commands.`,
      })
    }

    addLines(newLines)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (input.trim()) {
        setCommandHistory((prev) => [...prev, input])
        setHistoryIndex(-1)
      }
      processCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Auto-complete
      const allCommands = Object.keys(commands).filter(c => c !== "" && c.startsWith(input.toLowerCase()))
      if (allCommands.length === 1) {
        setInput(allCommands[0])
      } else if (allCommands.length > 1 && input.length > 0) {
        // Show suggestions
        const newLines: HistoryLine[] = [
          { id: getNextId(), type: "info", content: `Suggestions: ${allCommands.slice(0, 5).join(", ")}${allCommands.length > 5 ? "..." : ""}` }
        ]
        addLines(newLines)
      }
    }
  }

  const getLineClass = (type: HistoryLine["type"]) => {
    switch (type) {
      case "command":
        return "text-primary font-semibold"
      case "error":
        return "text-red-400 pl-2 sm:pl-4"
      case "success":
        return "text-green-400 pl-2 sm:pl-4"
      case "info":
        return "text-blue-400 pl-2 sm:pl-4"
      case "ascii":
        return "text-primary pl-2 sm:pl-4 font-bold"
      default:
        return "text-foreground/80 pl-2 sm:pl-4"
    }
  }

  return (
    <div className="glass-card rounded-lg p-4 sm:p-6 md:p-8 border shadow-lg relative overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

      {/* Terminal Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border/50">
        <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
        <span className="font-mono text-xs sm:text-sm text-muted-foreground">guest@raghav:~</span>
        <div className="flex gap-1 sm:gap-1.5 ml-auto">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={outputRef}
        onClick={focusInput}
        className="font-mono text-xs sm:text-sm min-h-[200px] sm:min-h-[240px] md:min-h-[280px] max-h-[280px] sm:max-h-[320px] md:max-h-[360px] overflow-y-auto overflow-x-hidden cursor-text select-text relative z-10"
      >
        {/* Welcome Message */}
        <div className="text-muted-foreground mb-3 space-y-1">
          <div className="text-primary font-semibold">Welcome to Raghav&apos;s Portfolio Terminal</div>
          <div className="text-xs">Type <span className="text-primary">&apos;help&apos;</span> for available commands or <span className="text-primary">&apos;neofetch&apos;</span> for system info</div>
          <div className="text-xs text-muted-foreground/60">Pro tip: Use ↑↓ for history, Tab for autocomplete</div>
        </div>

        {/* History Lines */}
        <AnimatePresence mode="popLayout">
          {history.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className={`${getLineClass(line.type)} break-words whitespace-pre-wrap`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <div className="flex items-center mt-1">
          <span className="text-green-400 mr-1">guest@raghav:~$</span>
          <span className="text-foreground break-all">{input}</span>
          <span className="terminal-cursor w-2 h-4 sm:h-5 bg-primary ml-0.5 inline-block"></span>
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 pointer-events-none"
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}
