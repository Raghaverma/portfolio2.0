import { Project } from "@/components/projects-section"
import { Experience } from "@/components/experience-section"

// Hardcoded Data - Updated with accurate information from repositories
const PROJECTS: Project[] = [
    {
        name: "AutoClip",
        description: "A computer-vision system that turns a full, unedited match recording into a folder of individual, reviewable clips — automatically locating each cricketing event frame-by-frame, with zero manual scrubbing. Built around pose estimation, multi-model GPU inference, ball tracking, and lossless video cutting.",
        tech: ["Python", "PyTorch", "YOLO Pose", "OpenCV", "TrackNet", "CatBoost", "Flask", "FFmpeg", "CUDA"],
        highlights: [
            "Engineered an end-to-end CV pipeline that localizes events with pose estimation and a multi-stage accuracy stack (scene segmentation, replay rejection, trajectory confirmation)",
            "Optimized GPU throughput with batched, concurrent multi-model inference running on an RTX A5000",
            "Built lossless clip extraction (FFmpeg stream-copy) plus a human-in-the-loop review UI for accept/reject and export",
            "Authored a custom dataset-mining and model fine-tuning workflow to train a domain-specific detector from raw footage"
        ],
        category: "Computer Vision · ML",
        isPrivate: true
    },
    {
        name: "Phalanx",
        description: "An autonomous application-security platform that clones any repository, runs a federated multi-scanner pipeline, and deterministically triages every finding against industry frameworks — no LLM required. It scores exploitability, builds reachability graphs, and enforces policy-as-code that can gate CI/CD automatically.",
        tech: ["Go", "Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker"],
        highlights: [
            "Architected a multi-service backend — Go API + worker and a Python triage engine — coordinated over a Redis Streams job queue with real-time SSE progress",
            "Built multi-tenant RBAC, scoped API tokens, append-only audit logging, and sandboxed execution of untrusted repository code",
            "Implemented fully offline triage: CVSS v3.1 scoring, CWE / OWASP / MITRE ATT&CK mapping, and import-graph reachability analysis",
            "Added CI/CD-native PR scanning via a GitHub App with commit status checks and policy-as-code gates"
        ],
        category: "Security · Distributed Systems",
        isPrivate: true
    },
    {
        name: "Forge",
        description: "A runtime platform for autonomous AI operators that run business and engineering workflows on a user's behalf — where nothing executes without approval and nothing persists without audit. Built as a strictly-layered TypeScript monorepo with an operator kernel, event bus, routine engine, and a VS Code client.",
        tech: ["TypeScript", "Node.js", "LLM Tool-Use", "VS Code Extension API", "Express", "ts-morph", "esbuild"],
        highlights: [
            "Designed a platform kernel — operator registry, wildcard event bus, persistent memory, and a cron + event-driven routine engine",
            "Enforced permissions at the capability layer with approval gating and tamper-proof, append-only audit logging",
            "Built LLM tool-use agent loops with staged-only writes, pre-apply verification (tsc + ESLint), and dependency-impact scoring before any disk write",
            "Authored a VS Code extension client plus an HTTP + SSE runtime host orchestrating multiple specialized operators"
        ],
        category: "Platform · AI Agents",
        isPrivate: true
    },
    {
        name: "RepoGremlin",
        description: "A repo-aware developer workflow agent that understands repository structure, generates implementation plans, reviews changes, and maintains project context — built on a permission-aware Rust runtime.",
        tech: ["Rust", "Python", "CLI", "AI Agents"],
        highlights: [
            "Analyze any codebase and surface architecture, entrypoints, and risky areas",
            "Turn feature requests into file-level implementation plans with context-aware reasoning",
            "Session-persistent context across analytical runs with structured handoff output"
        ],
        github: "https://github.com/Raghaverma/repogremlin",
        underConstruction: true
    },
    {
        name: "Meridian",
        description: "Production API integration SDK unifying Anthropic, OpenAI, Stripe, and GitHub behind a single typed interface — with built-in circuit breakers, retry logic, and zero dependencies. Owned architecture, type system, and npm release.",
        tech: ["TypeScript", "Node.js", "API Design", "Resilience Patterns"],
        highlights: [
            "Eliminates boilerplate retry and error handling across Anthropic, OpenAI, Stripe and GitHub",
            "Unified interface with type-safe, predictable return values and standardized error shapes",
            "Built-in circuit breakers for fault tolerance and reliability",
            "Zero dependencies with tree-shakeable architecture"
        ],
        github: "https://github.com/Raghaverma/meridianjs",
        npm: "https://www.npmjs.com/package/meridianjs",
        demo: "https://boundary.raghav-verma.com/"
    },
    {
        name: "DevTrackr",
        description: "Production-grade TypeScript SDK for extracting and normalizing GitHub developer signals into UI-ready JSON responses, eliminating raw API data complexity.",
        tech: ["TypeScript", "Node.js", "GitHub API"],
        highlights: [
            "Type-safe with complete TypeScript support and exported types",
            "Tree-shakeable with zero side effects for optimized bundle sizing",
            "Typed error handling with rate limit information included",
            "Dual module support (ESM and CommonJS) with zero dependencies"
        ],
        github: "https://github.com/Raghaverma/Devtrackr",
        demo: "https://devtrackr.raghav-verma.com/"
    },
    {
        name: "FilmMuse",
        description: "Modern film discovery platform with personalized recommendations, watchlist management, custom lists, and social features. Implements algorithm-based movie recommendations using genre matching and scoring.",
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "Firebase", "TMDb API"],
        highlights: [
            "Personalized recommendation engine with genre matching and scoring algorithms",
            "Social features including friends system, following, and list sharing capabilities",
            "Comprehensive movie details with cast, crew, trailers, and reviews",
            "Optimized search with autocomplete and fuzzy matching using Fuse.js"
        ],
        github: "https://github.com/Raghaverma/FilmMuse",
        demo: "https://filmmuse.raghav-verma.com/"
    },
    {
        name: "Major Realites",
        description: "Premium real estate platform showcasing architectural masterpieces where architecture becomes a dialogue between form and emotion. Features immersive storytelling and comprehensive property showcases.",
        tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "GSAP", "shadcn/ui"],
        highlights: [
            "Immersive storytelling exploring architectural themes of emotion, humanity, and space",
            "Interactive property showcase with gallery views and detailed specifications",
            "Smooth animations and transitions using GSAP for enhanced engagement",
            "Modern responsive UI with TanStack Query for optimized data fetching"
        ],
        github: "https://github.com/Raghaverma/Major-Realites",
        demo: "https://realities.raghav-verma.com/"
    },
    {
        name: "Wroom Inc",
        description: "Product-focused web experience demonstrating modern frontend engineering practices within a real-world application structure. Showcases contemporary development patterns and component-driven architecture.",
        tech: ["Next.js", "TypeScript", "CSS", "pnpm"],
        highlights: [
            "Automatic synchronization with v0.app deployments for seamless workflow",
            "Production-ready landing page with modern component-driven architecture",
            "Type-safe development with TypeScript for enhanced developer experience",
            "Responsive design with optimized build configuration and performance"
        ],
        github: "https://github.com/Raghaverma/Wroom-Inc",
        demo: "https://wroom.raghav-verma.com/"
    }
]

const EXPERIENCES: Experience[] = [
    {
        title: "SDE",
        company: "Khel.AI",
        location: "Noida, India",
        period: "May 2026 — Present",
        highlights: [
            "Developing Canvas-based rendering pipelines and browser-side motion analytics tooling",
            "Architecting modular React component systems and 3D visualization layers"
        ]
    },
    {
        title: "SDE Intern",
        company: "Khel.AI",
        location: "Noida, India",
        period: "Feb 2026 — May 2026",
        highlights: [
            "Built and refined sports analytics interfaces used in real-time operator workflows, focusing on performance, rendering precision, and product reliability",
            "Converted to a full-time SDE role"
        ]
    },
    {
        title: "Frontend Engineer (Contract)",
        company: "Hypeliv Solutions Pvt. Ltd",
        location: "Delhi NCR, India",
        period: "Aug 2025 — Jan 2026",
        highlights: [
            "Improved perceived load time on a Next.js trading platform through code splitting, dynamic imports, and component architecture refactoring",
            "Built core product features with real-time data streams and robust schema validation",
            "Refactored component architecture to improve rendering efficiency"
        ]
    },
    {
        title: "Frontend Engineer Intern",
        company: "The TechnoLabs",
        location: "Delhi NCR, India",
        period: "Jan 2024 — Jul 2024",
        highlights: [
            "Built a document generation system with PDF export capabilities using React",
            "Integrated REST APIs for data submission and retrieval workflows",
            "Contributed to data pipeline tooling for document processing"
        ]
    }
]

export async function getProjects(): Promise<Project[]> {
    return PROJECTS
}

export async function getExperiences(): Promise<Experience[]> {
    return EXPERIENCES
}
