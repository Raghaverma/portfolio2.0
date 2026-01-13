import { Project } from "@/components/projects-section"
import { Experience } from "@/components/experience-section"

// Hardcoded Data - Updated with accurate information from repositories
const PROJECTS: Project[] = [
    {
        name: "Boundary",
        description: "A production-grade API integration SDK that provides unified typing and consistent response structures across multiple third-party APIs. Implements resilience patterns including circuit breakers and standardized error handling.",
        tech: ["TypeScript", "Node.js", "API Design", "Resilience Patterns"],
        highlights: [
            "Unified interface for seamless integration across multiple API providers",
            "Type-safe, predictable return values with standardized error shapes",
            "Built-in circuit breakers for fault tolerance and reliability",
            "Zero dependencies with tree-shakeable architecture"
        ],
        github: "https://github.com/Raghaverma/Boundary-Docs",
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
        name: "Pragya Med",
        description: "Diagnostic platform for NEET medical exam aspirants (UG/PG) that identifies weak knowledge areas, categorizes error types, and delivers data-driven improvement strategies through mock testing and analytics.",
        tech: ["Next.js 14+", "TypeScript", "Tailwind CSS v4", "Zustand", "Recharts"],
        highlights: [
            "Role-based authentication flows with secure state management and protected routes",
            "Full-screen exam simulation with server-synchronized timer and anti-cheat measures",
            "Algorithm-driven diagnostics with weakness detection and percentile ranking",
            "Post-test analytics with accuracy trends and detailed question-level review"
        ],
        github: "https://github.com/Raghaverma/Pragya-Med",
        demo: "https://pragyamed.raghav-verma.com/"
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
        title: "Front-end Developer",
        company: "Hypeliv Solutions Pvt. Ltd",
        location: "Delhi NCR, India",
        period: "Aug 2025 - Jan 2026",
        highlights: [
            "Developed a trading and analytics platform reducing load times by 20-30% through performance optimization",
            "Built Markets, Leaderboard, and Wallet pages using Next.js and TypeScript with focus on user experience",
            "Implemented responsive UI components and integrated real-time data visualization features",
            "Collaborated with backend team to optimize API integration and state management"
        ]
    }
]

export async function getProjects(): Promise<Project[]> {
    return PROJECTS
}

export async function getExperiences(): Promise<Experience[]> {
    return EXPERIENCES
}
