export type ProjectStatus = "production" | "open-source" | "private";

export type DiagramKey = "autoclip" | "forge" | "meridian" | "phalanx";

export type CodeSnippet = {
  lang: string;
  label: string;
  code: string;
};

export type Project = {
  slug: string;
  name: string;
  /** short, punchy descriptor for the work index */
  kind: string;
  tagline: string;
  /** one-line summary for cards / lists */
  summary: string;
  year: string;
  role: string;
  status: ProjectStatus;
  diagram: DiagramKey;
  stack: string[];
  links: { label: string; href: string }[];
  metrics: { value: string; label: string }[];

  problem: { context: string; scope: string[] };
  architecture: {
    intro: string;
    flow: { step: string; detail: string }[];
    patterns: { title: string; detail: string }[];
  };
  challenge: {
    title: string;
    hurdle: string;
    approach: string;
    code?: CodeSnippet;
  };
  ux?: { intro: string; points: string[] };
  postmortem: { learned: string; roadmap: string[] };
};

const projectsUnordered: Project[] = [
  // ──────────────────────────────────────────────────────────
  {
    slug: "autoclip",
    name: "AutoClip",
    kind: "Computer-vision pipeline",
    tagline: "Turning raw cricket broadcast into auto-clipped deliveries.",
    summary:
      "A real-time CV pipeline that ingests live broadcast and automatically detects, validates, and clips every bowling delivery from noisy full-match footage.",
    year: "2026",
    role: "SWE · Khel.AI",
    status: "production",
    diagram: "autoclip",
    stack: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "FFmpeg",
      "Express",
      "Socket.IO",
      "OBS WebSocket",
      "React",
    ],
    links: [],
    metrics: [
      { value: "Real-time", label: "Edge ingestion latency" },
      { value: "5-stage", label: "Delivery validation" },
      { value: "Lossless", label: "Stream-copy clipping" },
    ],
    problem: {
      context:
        "Analysts at Khel.AI needed every bowling delivery isolated from hours of continuous match footage. Doing it by hand is slow and unscalable — and broadcast video is hostile: replays masquerade as live action, camera angles cut without warning, and on-screen graphics corrupt naïve frame analysis.",
      scope: [
        "Operate on a live broadcast stream, not a clean pre-recorded file",
        "Reject replays, transitions, and non-bowling segments with high precision",
        "Clip without re-encoding so output stays frame-accurate and lossless",
        "Keep a human in the loop to correct edge cases",
      ],
    },
    architecture: {
      intro:
        "AutoClip is a staged pipeline: a low-latency ingestion edge feeds a CV analysis core, whose temporal signals are fused into a delivery decision, then handed to a clip extractor and a review surface.",
      flow: [
        {
          step: "Edge ingestion",
          detail:
            "OBS WebSocket → Express → Socket.IO streams broadcast frames with minimal latency for downstream processing.",
        },
        {
          step: "Frame analysis",
          detail:
            "YOLOv8 + OpenCV extract player pose, ball position, and geometric features per frame.",
        },
        {
          step: "Delivery detection",
          detail:
            "Wrist-apex tracking, foot-contact analysis, and ball-trajectory validation fuse into a single delivery signal.",
        },
        {
          step: "Noise suppression",
          detail:
            "Replay detection and scene segmentation discard transitions and duplicate footage before clipping.",
        },
        {
          step: "Clip extraction",
          detail:
            "FFmpeg stream-copy clipping with atomic writes + automated cache cleanup produces lossless output.",
        },
        {
          step: "Human review",
          detail:
            "A React tool surfaces each candidate for delivery classification, release tracking, and no-ball estimation.",
        },
      ],
      patterns: [
        {
          title: "Temporal motion analysis",
          detail:
            "Decisions never rest on a single frame. Signals are accumulated across a window so a momentary occlusion or graphic overlay can't trigger a false clip.",
        },
        {
          title: "Multi-signal fusion",
          detail:
            "Wrist apex, foot contact, and ball trajectory each vote. A delivery is only confirmed when independent geometric signals agree — the same logic that kills replays.",
        },
        {
          title: "Atomic, lossless output",
          detail:
            "Stream-copy (no re-encode) keeps clips frame-accurate; atomic writes mean a crash mid-clip never leaves a corrupt file in the cache.",
        },
      ],
    },
    challenge: {
      title: "Telling a real delivery apart from a replay",
      hurdle:
        "Broadcast replays contain the exact motion of a live delivery — same bowler, same action — so any model that looks at the action alone will clip the same ball twice. Single-frame classification was hopeless against scene cuts and overlay graphics.",
      approach:
        "I moved the decision from the spatial domain to the temporal one. Each candidate accumulates evidence across a frame window — wrist-apex trajectory, foot-contact timing, and ball-path continuity — and is cross-checked against a scene-segmentation signal that flags hard cuts and replay wipes. Only when the geometric signals agree AND the segment is continuous live action does a clip fire.",
      code: {
        lang: "python",
        label: "Multi-signal delivery gate (illustrative)",
        code: `def confirm_delivery(window: FrameWindow) -> bool:
    # Each signal is computed over a temporal window, never one frame.
    wrist = wrist_apex_passed(window)          # bowling arm reaches apex
    feet = foot_contact_detected(window)        # front foot lands in crease
    ball = ball_trajectory_valid(window)        # ball departs toward batter

    # Replays reuse the action but break scene continuity.
    if window.scene.is_replay or window.scene.has_hard_cut:
        return False

    # Independent geometric signals must agree before we clip.
    return wrist and feet and ball`,
      },
    },
    ux: {
      intro:
        "Automation gets you 90% of the way; the review surface owns the last 10%.",
      points: [
        "Frame-level analytics let a reviewer accept, reject, or re-time a clip in one keystroke.",
        "Delivery classification, release tracking, and no-ball estimation are surfaced inline — no context switching.",
        "Metadata generation feeds back into custom cricket-ball detector training workflows.",
      ],
    },
    postmortem: {
      learned:
        "My first instinct was a bigger model. The real win was cheaper: fusing weak temporal signals beat a heavier single-frame classifier, and it generalised to broadcast noise the model never saw in training.",
      roadmap: [
        "On-device inference to drop the ingestion-to-clip round trip further",
        "Self-supervised replay detection to remove the last hand-tuned heuristics",
        "Auto-labelled training set generated from confirmed review decisions",
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  {
    slug: "forge",
    name: "Forge",
    kind: "Autonomous operator runtime",
    tagline: "A runtime for AI operators that ship work — behind approval gates.",
    summary:
      "A strictly-layered TypeScript monorepo where specialized AI operators execute real business workflows under mandatory approval gates and an append-only audit log.",
    year: "2025",
    role: "Founder",
    status: "private",
    diagram: "forge",
    stack: [
      "TypeScript",
      "Node.js",
      "Monorepo",
      "VS Code Extension API",
      "Event Bus",
      "ts-morph",
      "LLM Tool-Use",
    ],
    links: [],
    metrics: [
      { value: "6", label: "Specialized operators" },
      { value: "26", label: "Cross-operator routines" },
      { value: "60s", label: "Coordination tick" },
    ],
    problem: {
      context:
        "Autonomous agents are easy to demo and terrifying to run. The moment one can touch Gmail, Stripe, or your codebase, 'it usually works' is not good enough. Forge asks: what's the runtime you'd actually trust to let an operator act on your business?",
      scope: [
        "Every consequential action must pass an explicit approval gate",
        "Nothing happens without an append-only audit record",
        "Operators must coordinate without trampling each other's permissions",
        "Code-writing operators must verify before they apply",
      ],
    },
    architecture: {
      intro:
        "Forge is built as a strictly-layered monorepo: a permission-enforced operator registry sits beneath an event bus and routine engine, with an approval-flow engine guarding the boundary between proposal and effect.",
      flow: [
        {
          step: "Operator registry",
          detail:
            "Six specialized operators (HR, Finance, Marketing, Support, Data, Dev) register with permission-enforced capability scopes.",
        },
        {
          step: "Event bus",
          detail:
            "Operators coordinate through a shared event bus on a 60-second tick rather than calling each other directly.",
        },
        {
          step: "Routine engine",
          detail:
            "26 cross-operator routines run on cron and event triggers, composing operators into multi-step workflows.",
        },
        {
          step: "Approval-flow engine",
          detail:
            "Proposals are staged, scored for impact via dependency-graph analysis, and held until a human approves.",
        },
        {
          step: "Pre-apply verification",
          detail:
            "Code-synthesis proposals run tsc + ESLint before they're allowed to touch the working tree.",
        },
        {
          step: "Audit + replay",
          detail:
            "Every effect lands in an append-only log; sessions replay with full cost telemetry.",
        },
      ],
      patterns: [
        {
          title: "Approval-gated execution",
          detail:
            "The runtime separates 'propose' from 'apply'. An operator can plan anything; it can only act through a gate that a human (or policy) opens.",
        },
        {
          title: "Append-only audit log",
          detail:
            "State changes are events, never overwrites. You can always reconstruct exactly what an operator did and what it cost.",
        },
        {
          title: "Strict dependency layering",
          detail:
            "The monorepo enforces dependency direction at build time — clients can't reach into the kernel, operators can't bypass the registry.",
        },
      ],
    },
    challenge: {
      title: "Letting an operator write code without letting it break the repo",
      hurdle:
        "A 'Dev' operator that proposes code changes is only useful if it can apply them — and only safe if a bad proposal can never land. I needed to score how risky a change was and block it before it touched disk, not after.",
      approach:
        "Each code proposal is staged in isolation and run through real verification — tsc and ESLint — before it's eligible to apply. On top of that, I score impact by walking the dependency graph with ts-morph: a change to a leaf module is low-risk; a change to a heavily-imported module raises the approval bar. The gate uses that score to decide what a human must sign off on.",
      code: {
        lang: "typescript",
        label: "Impact scoring before apply (illustrative)",
        code: `async function scoreProposal(p: Proposal): Promise<Verdict> {
  // 1. Verify in isolation — a proposal that fails never reaches disk.
  const checks = await Promise.all([runTsc(p), runEslint(p)]);
  if (checks.some((c) => !c.ok)) return { apply: false, reason: "verification" };

  // 2. Blast radius = how many modules depend on what changed.
  const radius = p.touched
    .map((file) => graph.dependentsOf(file).length)
    .reduce((a, b) => a + b, 0);

  // 3. High blast radius escalates the approval gate; it never auto-applies.
  return radius > THRESHOLD
    ? { apply: false, reason: "needs-human", radius }
    : { apply: true, radius };
}`,
      },
    },
    ux: {
      intro: "One runtime, three front doors — meet the operator where the work is.",
      points: [
        "A VS Code extension for the Dev operator, a web console for oversight, and a CLI for automation.",
        "Session replay reconstructs any run step-by-step with cost telemetry attached.",
        "Real integrations — Gmail, Slack, Linear, Sheets, Stripe, GitHub — not mocked connectors.",
      ],
    },
    postmortem: {
      learned:
        "I over-built coordination first and trust second, and it showed. The audit log and approval gate should have been the foundation the operators were written on top of — once they were, every new operator inherited safety for free.",
      roadmap: [
        "Policy-as-code approvals so low-risk gates can open without a human",
        "Per-operator cost budgets enforced by the runtime",
        "Deterministic replay for regression-testing operator behavior",
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  {
    slug: "phalanx",
    name: "Phalanx",
    kind: "Autonomous AppSec platform",
    tagline: "Deterministic vulnerability triage that engineers can actually trust.",
    summary:
      "An application-security platform that clones a repo, runs a federated multi-scanner pipeline, and triages findings deterministically — no LLM in the verdict path — with exploitability scoring and CI/CD policy gating.",
    year: "2025",
    role: "Founder",
    status: "private",
    diagram: "phalanx",
    stack: [
      "Go",
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    links: [],
    metrics: [
      { value: "Federated", label: "Multi-scanner pipeline" },
      { value: "No-LLM", label: "Deterministic triage" },
      { value: "Policy", label: "CI/CD gating" },
    ],
    problem: {
      context:
        "Security scanners are noise machines — they flag everything and prioritise nothing, so real vulnerabilities drown in false positives. Worse, AI-driven triage is non-deterministic: the same finding can be graded differently twice, which is unacceptable when a verdict blocks a deploy.",
      scope: [
        "Run many scanners and reconcile their findings into one model",
        "Triage must be deterministic and explainable — reproducible every run",
        "Score real exploitability, not raw CVSS",
        "Gate CI/CD on policy without becoming the thing engineers route around",
      ],
    },
    architecture: {
      intro:
        "Phalanx is a pipeline with a deliberately boring, deterministic core: ingest broadly, normalise, then triage with rules — never a model — so the same input always yields the same verdict.",
      flow: [
        {
          step: "Clone + ingest",
          detail:
            "The platform clones the target repository and prepares it for a federated scan.",
        },
        {
          step: "Federated scanners",
          detail:
            "Multiple independent scanners run in parallel; their findings are normalised into a single schema.",
        },
        {
          step: "Deterministic triage",
          detail:
            "Findings are graded against industry frameworks by rules — explicitly no LLM in the verdict path.",
        },
        {
          step: "Exploitability scoring",
          detail:
            "Reachability graphs determine whether vulnerable code is actually reachable, scoring true exploitability over raw severity.",
        },
        {
          step: "Policy-as-code gating",
          detail:
            "A policy layer decides pass/fail for CI/CD, so the gate is versioned and reviewable like any other code.",
        },
      ],
      patterns: [
        {
          title: "Determinism by design",
          detail:
            "The verdict path is pure rules. Same repo, same scanners, same output — every time. That's what makes it safe to block a deploy on.",
        },
        {
          title: "Reachability over severity",
          detail:
            "A critical CVE in dead code isn't critical. Reachability graphs cut false urgency by asking whether the vulnerable path can actually be hit.",
        },
        {
          title: "Federated, not monolithic",
          detail:
            "No single scanner is trusted to be complete. Findings from many tools are normalised and reconciled into one exploitability model.",
        },
      ],
    },
    challenge: {
      title: "Scoring exploitability instead of severity",
      hurdle:
        "A scanner screaming 'CRITICAL' about a dependency you never call is just noise with a loud voice. The hard part wasn't finding vulnerabilities — it was deciding which ones could actually be reached and exploited.",
      approach:
        "I built reachability analysis on top of the normalised findings: a graph from entrypoints through the call structure to the vulnerable sink. If no path exists, the finding is downgraded regardless of CVSS. Exploitability becomes a function of reachability × framework severity × policy context — computed deterministically so a verdict is always defensible.",
      code: {
        lang: "go",
        label: "Reachability-weighted scoring (illustrative)",
        code: `// Exploitability is reachability-gated: an unreachable sink can't be exploited.
func Exploitability(f Finding, g *ReachGraph) Score {
    path := g.PathFromEntrypoint(f.Sink)
    if path == nil {
        return Score{Level: Informational, Reason: "unreachable"}
    }
    // Deterministic: same finding + same graph -> same score, always.
    weight := frameworkSeverity(f) * reachabilityWeight(path)
    return Score{Level: classify(weight), Path: path}
}`,
      },
    },
    postmortem: {
      learned:
        "The temptation to drop an LLM into triage was constant — and resisting it was the whole point. Determinism is a feature you have to defend; the moment a verdict isn't reproducible, no team will let it gate their pipeline.",
      roadmap: [
        "Inter-procedural reachability across service boundaries",
        "Suggested-fix synthesis kept strictly out of the verdict path",
        "Differential scanning so only changed reachability is recomputed per PR",
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  {
    slug: "meridian",
    name: "Meridian",
    kind: "API resilience SDK",
    tagline: "One typed interface for every flaky third-party API.",
    summary:
      "Reliability middleware for third-party APIs — normalises errors, rate limits, and pagination across 46 providers, with automatic failover, circuit breaking, schema-drift detection, and polyglot gRPC clients for Go, Rust, and Python. Zero runtime dependencies.",
    year: "2025",
    role: "Open source",
    status: "open-source",
    diagram: "meridian",
    stack: [
      "TypeScript",
      "Node.js",
      "gRPC",
      "Go",
      "Rust",
      "Python",
      "Redis",
      "OpenTelemetry",
      "Docker",
      "ESM / CJS",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Raghaverma" },
      { label: "npm", href: "https://www.npmjs.com/package/meridianjs" },
    ],
    metrics: [
      { value: "46", label: "Provider adapters" },
      { value: "2,119", label: "Tests passing" },
      { value: "0", label: "Runtime dependencies" },
    ],
    problem: {
      context:
        "Every service that talks to OpenAI, Stripe, or GitHub re-implements the same defensive plumbing — retries, backoff, fallbacks, breakers — slightly differently, slightly wrong. Each provider's error shape, rate-limit header, and pagination cursor leaks into your business logic, and when a provider goes down your app goes down with it.",
      scope: [
        "Normalise wildly different provider responses into one typed result",
        "Automatic failover for idempotent requests — writes are never silently replayed",
        "Add resilience without measurable runtime overhead",
        "Ship zero runtime dependencies — a resilience library can't be a liability",
        "Work in both ESM and CommonJS consumers, and from Go, Rust, and Python over gRPC",
      ],
    },
    architecture: {
      intro:
        "Meridian is a single layer between your app and every provider. Requests flow through retry, rate-limit coordination, and a circuit breaker; the caller always sees one typed response. A gRPC engine makes the full adapter set available to Go, Rust, and Python with no Node.js on the host.",
      flow: [
        {
          step: "Unified adapter layer",
          detail:
            "46 provider adapters (payments, AI/LLM, comms, KYC, infra) expose one typed request/response surface — same error shape, same rate-limit fields, same pagination cursor.",
        },
        {
          step: "Retry + backoff",
          detail:
            "Per-adapter classification of what's retryable; exponential backoff with full idempotency safety — writes are never silently replayed on a new provider.",
        },
        {
          step: "Rate-limit coordination",
          detail:
            "Token-bucket per provider with adaptive backoff; shared cooldown across all replicas via RedisStateStorage so a 429 on one process backs off the whole fleet.",
        },
        {
          step: "Circuit breaker",
          detail:
            "Per-provider closed/open/half-open state machine. Wraps the retry loop so 3 retries count as one logical failure, not three trips to the upstream.",
        },
        {
          step: "Failover",
          detail:
            "Define a service with ordered fallback providers; Meridian routes around outages automatically for GET/PUT/DELETE. POST is surfaced immediately to prevent duplicate charges.",
        },
        {
          step: "Observability + schema drift",
          detail:
            "One-line OpenTelemetry auto-instrumentation; schema snapshots gate CI on breaking provider contract changes before they reach prod.",
        },
      ],
      patterns: [
        {
          title: "Circuit breaker",
          detail:
            "Closed → open → half-open. Recovery is checked lazily on the next incoming request — no background timers, no event-loop cost on the hot path.",
        },
        {
          title: "Unified response typing",
          detail:
            "Provider quirks are normalised at the adapter boundary. Consumer code handles one MeridianError with .category, .retryable, and .retryAfter — never four bespoke shapes.",
        },
        {
          title: "Polyglot via gRPC",
          detail:
            "docker compose up starts a gRPC engine; pre-built Go, Rust, and Python clients get all 46 providers with no Node.js on the host. Any language with proto support can generate its own client.",
        },
      ],
    },
    challenge: {
      title: "A circuit breaker that never blocks the event loop",
      hurdle:
        "Resilience logic runs on the hot path of every request. Backoff timers and breaker state checks have to be effectively free — anything that blocks the event loop turns a reliability feature into a latency regression.",
      approach:
        "The breaker is a small state machine (closed/open/half-open) with O(1) transitions and no timers on the hot path — recovery is checked lazily against a timestamp when the next request arrives, not via a background interval. Backoff is non-blocking and the whole thing compiles to dual ESM/CJS with no runtime dependency to audit.",
      code: {
        lang: "typescript",
        label: "Lazy half-open transition (illustrative)",
        code: `class CircuitBreaker {
  private state: "closed" | "open" | "half-open" = "closed";
  private openedAt = 0;

  canRequest(now: number): boolean {
    // No timers, no event-loop work: recovery is checked lazily.
    if (this.state === "open" && now - this.openedAt > this.cooldown) {
      this.state = "half-open"; // probe one request for recovery
    }
    return this.state !== "open";
  }

  record(ok: boolean) {
    if (ok) this.state = "closed";
    else if (++this.failures >= this.threshold) this.trip();
  }
}`,
      },
    },
    postmortem: {
      learned:
        "Designing the typed boundary first was what made the rest fall out cleanly. Once every provider returned the same shape, retry/fallback/breaker/rate-limit were just composable middleware over that shape rather than 46 bespoke implementations.",
      roadmap: [
        "Inter-service transactions with compensating rollbacks across provider boundaries",
        "Per-provider cost budgets enforced at the adapter layer",
        "Reliability replay dashboard for reconstructing outage timelines post-mortem",
      ],
    },
  },
];

// Display order for the work index + case-study next/prev cycling.
const order = ["meridian", "forge", "autoclip", "phalanx"];
export const projects: Project[] = order
  .map((s) => projectsUnordered.find((p) => p.slug === s))
  .filter((p): p is Project => Boolean(p));

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
