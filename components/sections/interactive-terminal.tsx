"use client"

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Line {
  id: number
  type: "command" | "output" | "error" | "success" | "info" | "boot" | "dim"
  content: string
}

// ─── File System ──────────────────────────────────────────────────────────────

type FSFile = { type: "file"; content: string[] }
type FSDir  = { type: "dir";  children: Record<string, FSFile | FSDir> }

const FS: FSDir = {
  type: "dir",
  children: {
    "about.txt": { type: "file", content: [
      "Name     :  Raghav Verma",
      "Role     :  Full-Stack Developer",
      "Location :  New Delhi, India  (IST, UTC+5:30)",
      "Status   :  ● Open for work",
      "",
      "Building high-performance web applications through",
      "modern architecture, clean code, and intentional design.",
    ]},
    "contact.txt": { type: "file", content: [
      "Email    :  raghav.verma.work@gmail.com",
      "GitHub   :  github.com/Raghaverma",
      "LinkedIn :  linkedin.com/in/raghaverma",
      "Calendar :  cal.com/raghaverma",
    ]},
    "skills.json": { type: "file", content: [
      "{",
      '  "frontend"  : ["Next.js", "React", "TypeScript", "Tailwind CSS"],',
      '  "backend"   : ["Node.js", "Go", "Python", "FastAPI", "PostgreSQL", "Redis"],',
      '  "ml_cv"     : ["PyTorch", "YOLO Pose", "OpenCV", "GPU inference"],',
      '  "tools"     : ["Git", "Docker", "Vercel", "FFmpeg", "shadcn/ui"],',
      '  "learning"  : ["GraphQL", "distributed systems"]',
      "}",
    ]},
    "resume.pdf": { type: "file", content: [
      "Redirecting to /RaghavVerma_CV.pdf ...",
    ]},
    "projects": { type: "dir", children: {
      "autoclip": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# AutoClip",
          "",
          "Computer-vision system that turns a full match video into",
          "individual, reviewable clips — one per delivery / shot,",
          "located frame-by-frame with zero manual scrubbing.",
          "",
          "What I built:",
          "- Pose-estimation + multi-model GPU inference pipeline",
          "- Scene segmentation, replay rejection, ball tracking",
          "- Lossless FFmpeg clip cutting + review UI",
          "- Custom dataset-mining & model fine-tuning workflow",
          "",
          "Tech :  Python, PyTorch, YOLO Pose, OpenCV, TrackNet, FFmpeg",
          "Repo :  private",
        ]},
      }},
      "phalanx": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# Phalanx",
          "",
          "Autonomous application-security platform. Clones any repo,",
          "runs a federated multi-scanner pipeline, and deterministically",
          "triages every finding against CVSS / CWE / OWASP / MITRE.",
          "",
          "What I built:",
          "- Go API + worker and a Python triage engine",
          "- Redis Streams job queue with real-time SSE progress",
          "- Multi-tenant RBAC, audit logging, sandboxed execution",
          "- Reachability analysis + policy-as-code CI/CD gating",
          "",
          "Tech :  Go, Python, FastAPI, Next.js, PostgreSQL, Redis",
          "Repo :  private",
        ]},
      }},
      "forge": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# Forge",
          "",
          "Runtime platform for autonomous AI operators that run",
          "workflows on a user's behalf. Nothing executes without",
          "approval; nothing persists without audit.",
          "",
          "What I built:",
          "- Operator kernel: registry, event bus, routine engine",
          "- Capability-layer permissions + append-only audit log",
          "- LLM tool-use loops with staged writes + verification",
          "- VS Code client + HTTP/SSE runtime host",
          "",
          "Tech :  TypeScript, Node.js, LLM Tool-Use, VS Code API",
          "Repo :  private",
        ]},
      }},
      "meridian": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# Meridian",
          "",
          "Production-grade API integration SDK.",
          "Eliminates boilerplate retry and error handling",
          "across Anthropic, OpenAI, Stripe, and GitHub.",
          "",
          "Tech :  TypeScript, Node.js",
          "npm  :  npmjs.com/package/meridianjs",
          "Repo :  github.com/Raghaverma/meridianjs",
        ]},
      }},
      "devtrackr": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# DevTrackr",
          "",
          "TypeScript SDK for extracting and normalizing",
          "GitHub developer signals into UI-ready JSON.",
          "",
          "Tech :  TypeScript, GitHub API",
          "Demo :  devtrackr.raghav-verma.com",
          "Repo :  github.com/Raghaverma/Devtrackr",
        ]},
      }},
      "filmmuse": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# FilmMuse",
          "",
          "Modern film discovery platform with personalized",
          "recommendations, watchlists & social features.",
          "",
          "Tech :  Next.js 15, TypeScript, Firebase, TMDb API",
          "Demo :  filmmuse.raghav-verma.com",
          "Repo :  github.com/Raghaverma/FilmMuse",
        ]},
      }},
      "major-realties": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# Major Realties",
          "",
          "Premium real estate platform with immersive",
          "storytelling and smooth GSAP animations.",
          "",
          "Tech :  React, Vite, TypeScript, GSAP, shadcn/ui",
          "Demo :  realities.raghav-verma.com",
          "Repo :  github.com/Raghaverma/Major-Realites",
        ]},
      }},
      "wroom": { type: "dir", children: {
        "README.md": { type: "file", content: [
          "# Wroom Inc",
          "",
          "Product-focused web experience showcasing",
          "modern frontend engineering practices.",
          "",
          "Tech :  Next.js, TypeScript, CSS, pnpm",
          "Demo :  wroom.raghav-verma.com",
          "Repo :  github.com/Raghaverma/Wroom-Inc",
        ]},
      }},
    }},
  },
}

// ─── Boot Sequence ────────────────────────────────────────────────────────────

const BOOT: Array<{ text: string; delay: number; type: Line["type"] }> = [
  { text: "hold on, booting this thing up...",                delay: 0,    type: "dim"     },
  { text: "checking if spotify is alive... ☕",               delay: 280,  type: "dim"     },
  { text: "[  OK  ] spotify .............. vibing",           delay: 680,  type: "success" },
  { text: "[  OK  ] github ............... committed",        delay: 860,  type: "success" },
  { text: "[  OK  ] coffee levels ......... sufficient",      delay: 1040, type: "success" },
  { text: "",                                                 delay: 1200, type: "output"  },
  { text: "hey — i'm raghav. poke around or just ask me something.",
                                                              delay: 1280, type: "info"    },
  { text: "try  'help'  or  'ask how do you work'",          delay: 1380, type: "dim"     },
  { text: "",                                                 delay: 1480, type: "output"  },
]

// ─── Ask (Fake AI) ────────────────────────────────────────────────────────────

const ASK_RESPONSES: Array<{ keywords: string[]; response: string[] }> = [
  {
    keywords: ["available", "hire", "work", "freelance", "job", "opportunity", "open"],
    response: [
      "yeah, i'm open! looking for freelance gigs",
      "and full-time roles right now.",
      "",
      "i do my best work on frontend-heavy full-stack stuff —",
      "Next.js, React, TypeScript, that whole world.",
      "",
      "→ raghav.verma.work@gmail.com",
      "→ cal.com/raghaverma  (grab a slot, i don't bite)",
    ],
  },
  {
    keywords: ["project", "built", "made", "showcase", "portfolio"],
    response: [
      "shipped a few things i'm actually proud of:",
      "",
      "◆ AutoClip        — cricket event detection (computer vision / ML)",
      "◆ Phalanx         — autonomous AppSec platform (Go · Python)",
      "◆ Forge           — autonomous AI operator runtime (TypeScript)",
      "◆ Meridian        — API integration SDK (npm)",
      "◆ DevTrackr       — GitHub signals SDK",
      "◆ FilmMuse        — film discovery platform",
      "",
      "run 'ls projects/' to dig into any of them.",
    ],
  },
  {
    keywords: ["stack", "tech", "technology", "use", "language", "framework", "tools"],
    response: [
      "day-to-day stack:",
      "",
      "frontend  →  Next.js · React · TypeScript · Tailwind",
      "backend   →  Node.js · Go · Python · FastAPI · PostgreSQL · Redis",
      "ml / cv   →  PyTorch · YOLO Pose · OpenCV · GPU inference",
      "tools     →  Git · Docker · Vercel · FFmpeg · shadcn/ui",
      "",
      "run 'cat skills.json' for the full list.",
    ],
  },
  {
    keywords: ["experience", "background", "career", "worked", "company", "history"],
    response: [
      "SDE @ Khel.AI  (May 2026 – now)  — started as an intern (Feb–May), converted to full-time.",
      "sports analytics, computer vision, real-time video. cool stuff.",
      "",
      "Frontend Engineer @ Hypeliv Solutions  (2025 – 2026)",
      "built a trading & analytics platform. Next.js + TypeScript.",
      "",
      "run 'cat about.txt' if you want the full story.",
    ],
  },
  {
    keywords: ["education", "study", "university", "degree", "college", "school"],
    response: [
      "MCA  @  Vivekananda Institute (GGSIPU)  2024–2026",
      "BCA  @  Bennett University              2021–2024",
      "",
      "learned a ton on my own between classes tbh.",
      "system design, DSA, just building things.",
    ],
  },
  {
    keywords: ["contact", "reach", "email", "message", "talk", "connect"],
    response: [
      "easiest ways to reach me:",
      "",
      "→ raghav.verma.work@gmail.com",
      "→ github.com/Raghaverma",
      "→ linkedin.com/in/raghaverma",
      "",
      "run 'cat contact.txt' for the full list.",
    ],
  },
  {
    keywords: ["skill", "know", "good", "expert", "proficient", "strong", "best at"],
    response: [
      "things i'm genuinely good at:",
      "",
      "→ Next.js & React (shipped real production apps)",
      "→ TypeScript (i don't go back to JS)",
      "→ making things fast",
      "→ API design & wiring things together",
      "→ UI that actually looks good",
    ],
  },
  {
    keywords: ["location", "where", "based", "from", "india", "delhi", "timezone"],
    response: [
      "Based in New Delhi, India.",
      "Timezone: IST (UTC+5:30)",
      "",
      "I work with clients globally — async-first.",
      "Open to remote and hybrid roles.",
    ],
  },
  {
    keywords: ["about", "who", "yourself", "you", "raghav", "tell me", "introduce"],
    response: [
      "I'm Raghav Verma — a full-stack developer",
      "from New Delhi, India.",
      "",
      "I build fast, intentionally crafted web apps.",
      "I care about the architecture as much as the UI.",
      "",
      "When I'm not coding: music (try 'spotify'),",
      "side projects, and system design deep-dives.",
    ],
  },
  {
    keywords: ["hobby", "interest", "outside", "besides", "free time", "music", "passion"],
    response: [
      "Outside of work:",
      "",
      "♪ Music — run 'spotify' to see what's on right now",
      "◎ Building side projects (this site is one of them)",
      "◎ Reading about system design & architecture",
      "◎ Exploring new frameworks and tooling",
    ],
  },
  {
    keywords: ["goal", "future", "plan", "next", "aspiration", "ambition"],
    response: [
      "Short term:",
      "→ Ship more open-source tools",
      "→ Go deeper into system design & backend",
      "",
      "Long term:",
      "→ Build products people genuinely use every day",
      "→ Work with a team that cares about craft",
      "→ Maybe start something of my own.",
    ],
  },
  {
    keywords: ["rate", "price", "cost", "charge", "fee", "budget", "pay", "salary"],
    response: [
      "Rates depend on scope, timeline, and complexity.",
      "",
      "Best to discuss directly:",
      "→ raghav.verma.work@gmail.com",
      "→ cal.com/raghaverma  (15-min intro call)",
      "",
      "I'm flexible for the right project.",
    ],
  },
]

function getAskResponse(question: string): string[] {
  const q = question.toLowerCase()
  for (const entry of ASK_RESPONSES) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.response
    }
  }
  return [
    "I don't have a specific answer for that.",
    "",
    "Try asking about:",
    "available · projects · stack · experience",
    "education · contact · skills · location · goals",
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolvePath(cwd: string[], arg: string): string[] | null {
  if (arg === "~" || arg === "") return ["~"]
  const parts = arg.startsWith("/")
    ? ["~", ...arg.split("/").filter(Boolean)]
    : [...cwd, ...arg.split("/").filter(Boolean)]

  const resolved: string[] = ["~"]
  for (const p of parts.slice(1)) {
    if (p === "..") { if (resolved.length > 1) resolved.pop() }
    else if (p !== ".") resolved.push(p)
  }
  return resolved
}

function getNode(path: string[]): FSFile | FSDir | null {
  let node: FSFile | FSDir = FS
  for (const seg of path.slice(1)) {
    if (node.type !== "dir") return null
    const child: FSFile | FSDir | undefined = node.children[seg]
    if (!child) return null
    node = child
  }
  return node
}

function formatPath(path: string[]) {
  return path.join("/").replace("~", "~")
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InteractiveTerminal() {
  const [lines, setLines]           = useState<Line[]>([])
  const [input, setInput]           = useState("")
  const [booting, setBooting]       = useState(true)
  const [cwd, setCwd]               = useState<string[]>(["~"])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx]       = useState(-1)
  const [collapsed, setCollapsed]   = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const inputRef  = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const idRef     = useRef(0)

  const nextId = () => idRef.current++

  const push = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  // Boot sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT.forEach(({ text, delay, type }) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, { id: idRef.current++, type, content: text }])
        }, delay)
      )
    })
    timers.push(
      setTimeout(() => {
        setBooting(false)
        setTimeout(() => inputRef.current?.focus(), 80)
      }, 1900)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Auto-scroll: keep the latest output + the live input prompt pinned to view.
  // Runs on a rAF so Framer Motion has committed the new line's height first,
  // and also tracks `input` so a wrapping command stays visible while typing.
  useEffect(() => {
    const el = outputRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
    return () => cancelAnimationFrame(id)
  }, [lines, input, booting])

  const addOutput = (content: string[], type: Line["type"] = "output") =>
    content.map((c) => ({ id: nextId(), type, content: c } as Line))

  const processCommand = useCallback(
    async (raw: string) => {
      const cmd  = raw.trim()
      const lcmd = cmd.toLowerCase()
      const newLines: Line[] = []

      // Echo the command
      newLines.push({ id: nextId(), type: "command", content: `raghav@rv:${formatPath(cwd)}% ${cmd}` })

      if (!cmd) { push(newLines); return }

      // ── clear ──────────────────────────────────────────────────────────────
      if (lcmd === "clear" || lcmd === "cls") { setLines([]); return }

      // ── pwd ────────────────────────────────────────────────────────────────
      if (lcmd === "pwd") {
        newLines.push(...addOutput([formatPath(cwd).replace("~", "/home/raghav")]))
        push(newLines); return
      }

      // ── ls ─────────────────────────────────────────────────────────────────
      if (lcmd === "ls" || lcmd.startsWith("ls ")) {
        const arg  = lcmd === "ls" ? "" : cmd.slice(3).trim().replace(/\/+$/, "")
        const target = arg ? resolvePath(cwd, arg) : cwd
        if (!target) { newLines.push(...addOutput([`ls: cannot access '${arg}': No such file`], "error")); push(newLines); return }
        const node = getNode(target)
        if (!node) { newLines.push(...addOutput([`ls: cannot access '${arg}': No such file`], "error")); push(newLines); return }
        if (node.type === "file") { newLines.push(...addOutput([arg || target[target.length - 1]])); push(newLines); return }
        const entries = Object.entries(node.children).map(([name, n]) =>
          n.type === "dir" ? `\x1b[dir]${name}/` : name
        )
        newLines.push(...addOutput(entries.length ? [entries.join("   ")] : ["(empty)"]))
        push(newLines); return
      }

      // ── cd ─────────────────────────────────────────────────────────────────
      if (lcmd === "cd" || lcmd.startsWith("cd ")) {
        const arg = lcmd === "cd" ? "~" : cmd.slice(3).trim()
        const target = resolvePath(cwd, arg)
        if (!target) { newLines.push(...addOutput([`cd: no such file or directory: ${arg}`], "error")); push(newLines); return }
        const node = getNode(target)
        if (!node) { newLines.push(...addOutput([`cd: no such file or directory: ${arg}`], "error")); push(newLines); return }
        if (node.type === "file") { newLines.push(...addOutput([`cd: not a directory: ${arg}`], "error")); push(newLines); return }
        setCwd(target)
        push(newLines); return
      }

      // ── cat ────────────────────────────────────────────────────────────────
      if (lcmd.startsWith("cat ")) {
        const arg = cmd.slice(4).trim()
        const target = resolvePath(cwd, arg)
        if (!target) { newLines.push(...addOutput([`cat: ${arg}: No such file`], "error")); push(newLines); return }
        const node = getNode(target)
        if (!node) { newLines.push(...addOutput([`cat: ${arg}: No such file`], "error")); push(newLines); return }
        if (node.type === "dir") { newLines.push(...addOutput([`cat: ${arg}: Is a directory`], "error")); push(newLines); return }
        newLines.push(...addOutput(node.content))
        push(newLines); return
      }

      // ── spotify ────────────────────────────────────────────────────────────
      if (lcmd === "spotify") {
        newLines.push({ id: nextId(), type: "dim", content: "Fetching Spotify data..." })
        push(newLines)
        try {
          const res  = await fetch("/api/music")
          const data = await res.json()
          const more: Line[] = []
          if (data.title) {
            more.push(...addOutput([
              "╭─────────────────────────────────────╮",
              data.isPlaying
                ? "│  ♪  NOW PLAYING                     │"
                : "│  ◷  RECENTLY PLAYED                 │",
              "├─────────────────────────────────────┤",
              `│  ${(data.title || "").padEnd(36).slice(0, 36)} │`,
              `│  by ${(data.artist || "").padEnd(33).slice(0, 33)} │`,
              `│  ${(data.album  || "").padEnd(36).slice(0, 36)} │`,
              "╰─────────────────────────────────────╯",
            ]))
          } else {
            more.push(...addOutput(["Nothing currently playing."]))
          }
          push(more)
        } catch {
          push(addOutput(["Could not reach Spotify API."], "error"))
        }
        return
      }

      // ── github ─────────────────────────────────────────────────────────────
      if (lcmd === "github") {
        newLines.push({ id: nextId(), type: "dim", content: "Fetching GitHub activity..." })
        push(newLines)
        try {
          const res  = await fetch("/api/github")
          const data = await res.json()
          const more: Line[] = []
          const events = data.events?.slice(0, 3) || []
          if (events.length) {
            more.push(...addOutput(["Recent commits:", ""]))
            events.forEach((e: any, i: number) => {
              more.push(...addOutput([
                `  ${i + 1}. ${e.message.slice(0, 48)}`,
                `     → ${e.repo}`,
              ]))
            })
          } else {
            more.push(...addOutput(["No recent commits found."]))
          }
          push(more)
        } catch {
          push(addOutput(["Could not reach GitHub API."], "error"))
        }
        return
      }

      // ── ask ────────────────────────────────────────────────────────────────
      if (lcmd.startsWith("ask ") || lcmd === "ask") {
        const question = cmd.slice(4).trim()
        if (!question) {
          newLines.push(...addOutput(["Usage: ask <question>", "e.g.  ask are you available for work?"]))
          push(newLines); return
        }
        const thinkingId = nextId()
        newLines.push({ id: thinkingId, type: "dim", content: "thinking..." })
        push(newLines)
        try {
          const res = await fetch("/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: question }),
          })
          const data = await res.json()
          const reply: string = data.reply ?? "hmm, couldn't get a response."
          const more: Line[] = reply.split("\n").map((line) => ({
            id: nextId(),
            type: "info" as Line["type"],
            content: line,
          }))
          setLines((prev) => [...prev.filter((l) => l.id !== thinkingId), ...more])
        } catch {
          setLines((prev) => [
            ...prev.filter((l) => l.id !== thinkingId),
            { id: nextId(), type: "error", content: "couldn't reach the server, try again." },
          ])
        }
        return
      }

      // ── history ────────────────────────────────────────────────────────────
      if (lcmd === "history") {
        if (!cmdHistory.length) newLines.push(...addOutput(["No commands in history."]))
        else cmdHistory.forEach((c, i) => newLines.push(...addOutput([`  ${String(i + 1).padStart(3)}  ${c}`])))
        push(newLines); return
      }

      // ── neofetch ───────────────────────────────────────────────────────────
      if (lcmd === "neofetch") {
        newLines.push(...addOutput([
          "    ____  _    __     raghav @ rv",
          "   / __ \\| |  / /    ───────────────────────────",
          "  / /_/ /| | / /     OS:      macOS 15 Sequoia",
          " / _, _/ | |/ /      Shell:   zsh 5.9",
          "/_/ |_|  |___/       Role:    SDE @ Khel.AI",
          "                     Stack:   Next.js · TypeScript",
          "                     Status:  ● Open for work",
          "                     Music:   run 'spotify' to see",
        ]))
        push(newLines); return
      }

      // ── help ───────────────────────────────────────────────────────────────
      if (lcmd === "help") {
        newLines.push(...addOutput([
          "╭──────────────────────────────────────────────╮",
          "│              RV-OS  Commands                 │",
          "├──────────────────┬───────────────────────────┤",
          "│  Navigation      │  Information              │",
          "│  ls [path]       │  about · skills · contact │",
          "│  cd <dir>        │  projects · experience    │",
          "│  cat <file>      │  status · social          │",
          "│  pwd             │  neofetch · date          │",
          "├──────────────────┴───────────────────────────┤",
          "│  Live Data                                   │",
          "│  spotify         → now playing track         │",
          "│  github          → recent commits            │",
          "├──────────────────────────────────────────────┤",
          "│  AI                                          │",
          "│  ask <question>  → query anything about me   │",
          "├──────────────────────────────────────────────┤",
          "│  Utils                                       │",
          "│  clear · history · echo · help               │",
          "╰──────────────────────────────────────────────╯",
          "",
          "Tip: Tab autocompletes · ↑↓ browses history",
        ]))
        push(newLines); return
      }

      // ── static commands ────────────────────────────────────────────────────
      const STATIC: Record<string, { type: Line["type"]; lines: string[] }> = {
        whoami:     { type: "success", lines: ["Raghav Verma  —  Full-Stack Developer"] },
        status:     { type: "success", lines: ["● Online  —  Open for freelance & full-time work"] },
        about:      { type: "output",  lines: ["Full-stack developer from New Delhi.", "Building fast, intentionally crafted web apps.", "Run 'cat about.txt' for more detail."] },
        skills:     { type: "output",  lines: ["Run 'cat skills.json' for the full breakdown.", "Or 'ls' to explore the filesystem."] },
        projects:   { type: "output",  lines: ["Run 'ls projects/' to browse all projects.", "Or 'cd projects && ls'."] },
        experience: { type: "output",  lines: ["SDE @ Khel.AI (May 2026–Present)  ·  Canvas · React · TypeScript", "SDE Intern @ Khel.AI (Feb–May 2026)  ·  converted to full-time", "Frontend Eng. @ Hypeliv Solutions (2025–2026)  ·  Next.js · TypeScript"] },
        contact:    { type: "output",  lines: ["raghav.verma.work@gmail.com", "Run 'cat contact.txt' for all links."] },
        social:     { type: "output",  lines: ["GitHub:   github.com/Raghaverma", "LinkedIn: linkedin.com/in/raghaverma"] },
        date:       { type: "info",    lines: [new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + "  (IST)"] },
        sudo:       { type: "error",   lines: ["Permission denied. Nice try though."] },
        exit:       { type: "info",    lines: ["There's no escape. Refresh the page if you must."] },
        vim:        { type: "error",   lines: ["You're trapped. Type ':q!' … oh wait, that won't work here."] },
        coffee:     { type: "success", lines: ["☕ Here's your coffee. Now let's build something."] },
        "42":       { type: "info",    lines: ["The answer to life, the universe, and everything."] },
        hello:      { type: "success", lines: ["Hey! Type 'help' to see what I can do."] },
        hi:         { type: "success", lines: ["Hello! Try 'about' or 'ask who are you'."] },
        hey:        { type: "success", lines: ["Hey! Welcome to the portfolio terminal."] },
        "":         { type: "output",  lines: [] },
      }

      if (STATIC[lcmd]) {
        newLines.push(...addOutput(STATIC[lcmd].lines, STATIC[lcmd].type))
        push(newLines); return
      }

      // ── fallback: treat as AI question ─────────────────────────────────────
      const thinkingId = nextId()
      newLines.push({ id: thinkingId, type: "dim", content: "thinking..." })
      push(newLines)
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: cmd }),
        })
        const data = await res.json()
        const reply: string = data.reply ?? "hmm, couldn't get a response."
        const more: Line[] = reply.split("\n").map((line) => ({
          id: nextId(),
          type: "info" as Line["type"],
          content: line,
        }))
        setLines((prev) => [...prev.filter((l) => l.id !== thinkingId), ...more])
      } catch {
        setLines((prev) => [
          ...prev.filter((l) => l.id !== thinkingId),
          { id: nextId(), type: "error", content: "couldn't reach the server, try again." },
        ])
      }
    },
    [cwd, cmdHistory, push]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (booting) return

    if (e.key === "Enter") {
      e.preventDefault()
      const val = input
      if (val.trim()) {
        setCmdHistory((p) => [...p, val])
        setHistIdx(-1)
      }
      processCommand(val)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (cmdHistory.length) {
        const ni = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
        setHistIdx(ni)
        setInput(cmdHistory[ni])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx !== -1) {
        const ni = histIdx + 1
        if (ni >= cmdHistory.length) { setHistIdx(-1); setInput("") }
        else { setHistIdx(ni); setInput(cmdHistory[ni]) }
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault()
      setLines([])
    } else if (e.key === "Tab") {
      e.preventDefault()
      const ALL = ["help","ls","cd","cat","pwd","spotify","github","ask","whoami",
        "status","about","skills","projects","experience","contact","social","date",
        "neofetch","clear","history","echo"]
      const matches = ALL.filter((c) => c.startsWith(input.toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
      else if (matches.length > 1 && input) {
        push([{ id: nextId(), type: "dim", content: matches.join("   ") }])
      }
    }
  }

  const lineColor = (type: Line["type"]) => {
    switch (type) {
      case "command": return "font-semibold"   // rendered with custom spans
      case "success": return "text-[#3dd68c]"
      case "error":   return "text-[#ff6b6b]"
      case "info":    return "text-[#67d4f8]"
      case "boot":    return "text-[#c8c8c8]"
      case "dim":     return "text-[#6b7280]"
      default:        return "text-[#c8c8c8]"
    }
  }

  // Format ls output: highlight directories
  const formatContent = (line: Line) => {
    if (line.type !== "output") return line.content
    return line.content
  }

  const renderContent = (line: Line) => {
    const content = formatContent(line)

    // Command echo: "raghav@rv:~/path% cmd" — render with macOS zsh colors
    if (line.type === "command") {
      // Format: "guest@rv:~/path$ cmd" (legacy) or parse out parts
      const match = content.match(/^(\S+@\S+):(\S*)[%$]\s?(.*)$/)
      if (match) {
        const [, userHost, path, cmd] = match
        return (
          <>
            <span style={{ color: "#3dd68c" }}>{userHost}</span>
            {" "}
            <span style={{ color: "#67d4f8" }}>{path || "~"}</span>
            {" "}
            <span style={{ color: "#c8c8c8" }}>%</span>
            {" "}
            <span style={{ color: "#ffffff" }}>{cmd}</span>
          </>
        )
      }
      return <span style={{ color: "#c8c8c8" }}>{content}</span>
    }

    // ls output: highlight directories
    if (line.type === "output" && content.includes("   ")) {
      const parts = content.split("   ")
      const hasDirs = parts.some((p) => p.endsWith("/"))
      if (hasDirs) {
        return (
          <>
            {parts.map((p, i) => (
              <span key={i}>
                {i > 0 && "   "}
                <span style={p.endsWith("/") ? { color: "#67d4f8", fontWeight: 500 } : { color: "#c8c8c8" }}>
                  {p}
                </span>
              </span>
            ))}
          </>
        )
      }
    }

    return content
  }

  const cwdDisplay = formatPath(cwd).replace("~", "~")

  return (
    <motion.div
      layout
      transition={{ layout: { type: "spring", stiffness: 280, damping: 30 } }}
      className={`rounded-xl overflow-hidden flex flex-col ${fullscreen ? "fixed inset-0 md:inset-4 z-50 rounded-none md:rounded-xl" : ""}`}
      style={{
        background: "#1e1e1e",
        boxShadow: "0 32px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)",
      }}
    >
      {/* macOS title bar */}
      <div
        className="group flex items-center px-4 py-[11px] select-none"
        style={{
          background: "linear-gradient(to bottom, #3a3a3a, #2d2d2d)",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => { setLines([]); setInput("") }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] inline-flex items-center justify-center cursor-pointer hover:brightness-90 transition-all"
            title="Clear terminal"
          >
            <span className="text-[#7a0000] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 7, lineHeight: 1, marginTop: "-0.5px" }}>×</span>
          </button>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-3 h-3 rounded-full bg-[#febc2e] inline-flex items-center justify-center cursor-pointer hover:brightness-90 transition-all"
            title="Collapse terminal"
          >
            <span className="text-[#7a5000] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 9, lineHeight: 1, marginTop: "-1px" }}>−</span>
          </button>
          <button
            onClick={() => setFullscreen(f => !f)}
            className="w-3 h-3 rounded-full bg-[#28c840] inline-flex items-center justify-center cursor-pointer hover:brightness-90 transition-all"
            title="Fullscreen"
          >
            <span className="text-[#005800] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 7, lineHeight: 1 }}>+</span>
          </button>
        </div>

        {/* Tab strip */}
        <div className="mx-auto">
          <div
            className="flex items-center gap-2 px-5 py-[3px] rounded-md text-[11px] font-medium"
            style={{ background: "#1e1e1e", color: "#c8c8c8" }}
          >
            <span style={{ color: "#7a7a7a" }}>zsh</span>
            <span style={{ color: "#4a4a4a" }}>—</span>
            <span>{cwdDisplay}</span>
          </div>
        </div>

        <div className="w-[68px]" />
      </div>

      {/* Output area */}
      <div className={`relative transition-all duration-300 overflow-hidden ${collapsed ? "max-h-0" : ""} ${fullscreen ? "flex-1" : "min-h-[200px] md:min-h-[320px] max-h-[260px] md:max-h-[380px]"}`}>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, #1e1e1e)" }}
        />

        <div
          ref={outputRef}
          onClick={() => !booting && inputRef.current?.focus()}
          className="terminal-scroll relative px-4 pt-3 pb-4 font-mono text-[11px] md:text-[12.5px] leading-[1.6] overflow-y-auto cursor-text select-text h-full"
          style={{}}
        >
          <AnimatePresence mode="popLayout">
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.06 }}
                className={`whitespace-pre-wrap break-all ${lineColor(line.type)}`}
              >
                {renderContent(line)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input row — macOS zsh style */}
          {!booting && (
            <div className="flex items-center mt-0.5 flex-wrap gap-x-1.5">
              <span style={{ color: "#3dd68c" }} className="font-semibold shrink-0">raghav@rv</span>
              <span style={{ color: "#67d4f8" }} className="shrink-0">{cwdDisplay}</span>
              <span style={{ color: "#c8c8c8" }} className="shrink-0">%</span>
              <span style={{ color: "#c8c8c8" }} className="break-all">{input}</span>
              <span className="terminal-cursor w-[7px] h-[14px] ml-0 shrink-0 inline-block" style={{ background: "#c8c8c8" }} />
            </div>
          )}

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => !booting && setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            disabled={booting}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex items-center justify-between select-none"
        style={{ borderTop: "1px solid #1a1a1a", background: "#1a1a1a" }}
      >
        <span className="font-mono text-[10px]" style={{ color: "#4a4a4a" }}>
          powered by coffee ☕
        </span>
        <span className="font-mono text-[10px]" style={{ color: "#3a3a3a" }}>
          rv-os 2.0.25
        </span>
      </div>
    </motion.div>
  )
}
