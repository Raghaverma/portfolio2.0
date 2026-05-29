// Inline SVG/JSX project cards — one per project, fully scalable

export function MeridianCard() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Grid */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="450" stroke="#1a1a1a" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#1a1a1a" strokeWidth="1" />
      ))}

      {/* Circuit breaker nodes */}
      <circle cx="160" cy="225" r="28" fill="none" stroke="#944a32" strokeWidth="1.5" />
      <circle cx="160" cy="225" r="8" fill="#944a32" opacity="0.8" />
      <line x1="188" y1="225" x2="310" y2="225" stroke="#944a32" strokeWidth="1.5" strokeDasharray="6 3" />

      <rect x="310" y="200" width="80" height="50" rx="4" fill="none" stroke="#944a32" strokeWidth="1.5" />
      <text x="350" y="222" textAnchor="middle" fill="#944a32" fontSize="9" fontFamily="monospace">CIRCUIT</text>
      <text x="350" y="235" textAnchor="middle" fill="#944a32" fontSize="9" fontFamily="monospace">BREAKER</text>
      <text x="350" y="248" textAnchor="middle" fill="#28c840" fontSize="8" fontFamily="monospace">● CLOSED</text>

      <line x1="390" y1="225" x2="510" y2="225" stroke="#944a32" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="540" cy="225" r="28" fill="none" stroke="#3d3d3d" strokeWidth="1.5" />
      <circle cx="540" cy="225" r="8" fill="#3d3d3d" />

      {/* Provider labels */}
      <text x="160" y="270" textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace">provider</text>
      <text x="540" y="270" textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace">fallback</text>

      {/* Retry arc */}
      <path d="M 430 195 Q 430 140 350 140 Q 270 140 270 195" fill="none" stroke="#944a32" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="350" y="132" textAnchor="middle" fill="#944a32" fontSize="9" fontFamily="monospace" opacity="0.7">retry</text>

      {/* Code block */}
      <rect x="570" y="80" width="200" height="120" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="585" y="102" fill="#555" fontSize="9" fontFamily="monospace">// meridian.config.ts</text>
      <text x="585" y="120" fill="#944a32" fontSize="9" fontFamily="monospace">const</text>
      <text x="618" y="120" fill="#c8c8c8" fontSize="9" fontFamily="monospace"> api = new</text>
      <text x="585" y="136" fill="#67d4f8" fontSize="9" fontFamily="monospace">  Meridian</text>
      <text x="635" y="136" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"({"}</text>
      <text x="585" y="152" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  circuit: { threshold: 5 },"}</text>
      <text x="585" y="168" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  retry:   { attempts: 3 }"}</text>
      <text x="585" y="184" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"})"}</text>

      {/* Error shape */}
      <rect x="570" y="230" width="200" height="55" rx="4" fill="#1a0a0a" stroke="#944a32" strokeWidth="1" opacity="0.7" />
      <text x="585" y="250" fill="#944a32" fontSize="9" fontFamily="monospace">MeridianError {"{"}type: 'circuit'{"},"}</text>
      <text x="585" y="266" fill="#944a32" fontSize="9" fontFamily="monospace">  provider: 'stripe',</text>
      <text x="585" y="280" fill="#944a32" fontSize="9" fontFamily="monospace">  switched: true {"}"}</text>

      {/* Title */}
      <text x="40" y="60" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">Meridian</text>
      <text x="40" y="80" fill="#555" fontSize="11" fontFamily="monospace">API resilience SDK · npm</text>

      {/* Bottom tag */}
      <rect x="40" y="390" width="90" height="20" rx="2" fill="#1a1a1a" />
      <text x="85" y="404" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">TypeScript</text>
      <rect x="140" y="390" width="70" height="20" rx="2" fill="#1a1a1a" />
      <text x="175" y="404" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">Node.js</text>
    </svg>
  )
}

export function DevTrackrCard() {
  const weeks = 26
  const days = 7
  const cols = Array.from({ length: weeks })
  const rows = Array.from({ length: days })
  const intensities = Array.from({ length: weeks * days }, () => Math.random())

  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Contribution grid */}
      {cols.map((_, wi) =>
        rows.map((_, di) => {
          const v = intensities[wi * days + di]
          const color = v < 0.3 ? "#161b22" : v < 0.55 ? "#0e4429" : v < 0.75 ? "#006d32" : v < 0.9 ? "#26a641" : "#39d353"
          return (
            <rect
              key={`${wi}-${di}`}
              x={40 + wi * 20}
              y={80 + di * 20}
              width="16"
              height="16"
              rx="3"
              fill={color}
            />
          )
        })
      )}

      {/* Month labels */}
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
        <text key={m} x={40 + i * 84} y="72" fill="#555" fontSize="10" fontFamily="monospace">{m}</text>
      ))}

      {/* Stat boxes */}
      <rect x="40" y="240" width="140" height="70" rx="4" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <text x="55" y="264" fill="#555" fontSize="9" fontFamily="monospace">total commits</text>
      <text x="55" y="290" fill="#39d353" fontSize="26" fontFamily="monospace" fontWeight="bold">847</text>

      <rect x="200" y="240" width="140" height="70" rx="4" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <text x="215" y="264" fill="#555" fontSize="9" fontFamily="monospace">repos</text>
      <text x="215" y="290" fill="#67d4f8" fontSize="26" fontFamily="monospace" fontWeight="bold">23</text>

      <rect x="360" y="240" width="140" height="70" rx="4" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <text x="375" y="264" fill="#555" fontSize="9" fontFamily="monospace">streak</text>
      <text x="375" y="290" fill="#944a32" fontSize="26" fontFamily="monospace" fontWeight="bold">14d</text>

      {/* JSON output preview */}
      <rect x="540" y="80" width="230" height="230" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="555" y="102" fill="#555" fontSize="9" fontFamily="monospace">// normalized output</text>
      <text x="555" y="120" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"{"}</text>
      <text x="555" y="136" fill="#555" fontSize="9" fontFamily="monospace">{"  "}<tspan fill="#67d4f8">commits</tspan><tspan fill="#c8c8c8">{": {"}</tspan></text>
      <text x="555" y="152" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"    total: "}<tspan fill="#39d353">847</tspan><tspan>,</tspan></text>
      <text x="555" y="168" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"    streak: "}<tspan fill="#39d353">14</tspan><tspan>,</tspan></text>
      <text x="555" y="184" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"    byDay: [...] "}</text>
      <text x="555" y="200" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  },"}</text>
      <text x="555" y="216" fill="#555" fontSize="9" fontFamily="monospace">{"  "}<tspan fill="#67d4f8">repos</tspan><tspan fill="#c8c8c8">{": {"}</tspan></text>
      <text x="555" y="232" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"    count: "}<tspan fill="#39d353">23</tspan><tspan>,</tspan></text>
      <text x="555" y="248" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"    topLang: "}<tspan fill="#944a32">'TypeScript'</tspan></text>
      <text x="555" y="264" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  }"}</text>
      <text x="555" y="280" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"}"}</text>

      {/* Title */}
      <text x="40" y="370" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">DevTrackr</text>
      <text x="40" y="390" fill="#555" fontSize="11" fontFamily="monospace">GitHub signals SDK</text>

      {/* Tags */}
      <rect x="40" y="415" width="90" height="20" rx="2" fill="#1a1a1a" />
      <text x="85" y="429" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">TypeScript</text>
      <rect x="140" y="415" width="90" height="20" rx="2" fill="#1a1a1a" />
      <text x="185" y="429" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">GitHub API</text>
    </svg>
  )
}

export function FilmMuseCard() {
  const films = [
    { title: "Dune", rating: 4.5, genre: "Sci-Fi", color: "#c8a96e" },
    { title: "Oppenheimer", rating: 5, genre: "Drama", color: "#944a32" },
    { title: "Interstellar", rating: 5, genre: "Sci-Fi", color: "#67d4f8" },
    { title: "Parasite", rating: 4.5, genre: "Thriller", color: "#39d353" },
  ]

  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Film strip top */}
      <rect x="0" y="0" width="800" height="30" fill="#111" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={10 + i * 40} y="8" width="24" height="14" rx="2" fill="#0d0d0d" />
      ))}

      {/* Film strip bottom */}
      <rect x="0" y="420" width="800" height="30" fill="#111" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={10 + i * 40} y="428" width="24" height="14" rx="2" fill="#0d0d0d" />
      ))}

      {/* Movie cards */}
      {films.map((film, i) => (
        <g key={film.title} transform={`translate(${40 + i * 185}, 60)`}>
          <rect width="160" height="220" rx="4" fill="#111" stroke="#222" strokeWidth="1" />
          <rect width="160" height="140" rx="4" fill="#1a1a1a" />
          {/* poster color block */}
          <rect width="160" height="140" rx="4" fill={film.color} opacity="0.12" />
          <line x1="0" y1="70" x2="160" y2="70" stroke={film.color} strokeWidth="0.5" opacity="0.3" />
          <line x1="80" y1="0" x2="80" y2="140" stroke={film.color} strokeWidth="0.5" opacity="0.3" />
          <text x="80" y="80" textAnchor="middle" fill={film.color} fontSize="32" fontFamily="serif" fontStyle="italic" opacity="0.4">
            {film.title[0]}
          </text>
          {/* info */}
          <text x="12" y="160" fill="#c8c8c8" fontSize="12" fontFamily="monospace" fontWeight="bold">{film.title}</text>
          <text x="12" y="176" fill="#555" fontSize="9" fontFamily="monospace">{film.genre}</text>
          {/* stars */}
          {Array.from({ length: 5 }).map((_, s) => (
            <text key={s} x={12 + s * 14} y="196" fill={s < Math.floor(film.rating) ? film.color : "#2a2a2a"} fontSize="12" fontFamily="monospace">★</text>
          ))}
          <rect x="8" y="206" width="144" height="1" fill="#1e1e1e" />
          <text x="12" y="218" fill="#333" fontSize="8" fontFamily="monospace">add to watchlist +</text>
        </g>
      ))}

      {/* Title */}
      <text x="40" y="318" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">FilmMuse</text>
      <text x="40" y="338" fill="#555" fontSize="11" fontFamily="monospace">Film discovery platform</text>

      {/* Tags */}
      {["Next.js 15", "Firebase", "TMDb API"].map((t, i) => (
        <g key={t}>
          <rect x={40 + i * 110} y="358" width={t.length * 7 + 16} height="20" rx="2" fill="#1a1a1a" />
          <text x={40 + i * 110 + (t.length * 7 + 16) / 2} y="372" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function MajorRealitiesCard() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Architectural floor plan */}
      {/* Outer walls */}
      <rect x="60" y="60" width="440" height="310" fill="none" stroke="#2a2a2a" strokeWidth="2" />

      {/* Room divisions */}
      <line x1="60" y1="200" x2="280" y2="200" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="280" y1="60" x2="280" y2="370" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="280" y1="280" x2="500" y2="280" stroke="#2a2a2a" strokeWidth="1.5" />

      {/* Door openings */}
      <line x1="155" y1="200" x2="195" y2="200" stroke="#0d0d0d" strokeWidth="3" />
      <path d="M 155 200 Q 155 180 175 180" fill="none" stroke="#944a32" strokeWidth="1" opacity="0.6" />

      <line x1="280" y1="155" x2="280" y2="195" stroke="#0d0d0d" strokeWidth="3" />
      <path d="M 280 155 Q 260 155 260 175" fill="none" stroke="#944a32" strokeWidth="1" opacity="0.6" />

      {/* Room labels */}
      <text x="155" y="140" textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">LIVING</text>
      <text x="155" y="295" textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">BEDROOM</text>
      <text x="385" y="175" textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">KITCHEN</text>
      <text x="385" y="330" textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">BATH</text>

      {/* Furniture hints */}
      <rect x="80" y="80" width="80" height="40" rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="80" y="80" width="80" height="40" rx="2" fill="#944a32" opacity="0.08" />
      <rect x="100" y="340" width="120" height="20" rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />

      {/* Accent lines */}
      <line x1="60" y1="60" x2="80" y2="40" stroke="#944a32" strokeWidth="1" opacity="0.5" />
      <line x1="500" y1="60" x2="520" y2="40" stroke="#944a32" strokeWidth="1" opacity="0.5" />
      <line x1="500" y1="370" x2="520" y2="390" stroke="#944a32" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="370" x2="40" y2="390" stroke="#944a32" strokeWidth="1" opacity="0.5" />

      {/* Dimension lines */}
      <line x1="60" y1="30" x2="500" y2="30" stroke="#333" strokeWidth="0.5" />
      <text x="280" y="24" textAnchor="middle" fill="#333" fontSize="8" fontFamily="monospace">44.0m</text>
      <line x1="530" y1="60" x2="530" y2="370" stroke="#333" strokeWidth="0.5" />
      <text x="545" y="220" fill="#333" fontSize="8" fontFamily="monospace" transform="rotate(90 545 220)">31.0m</text>

      {/* Right panel — property card */}
      <rect x="570" y="60" width="200" height="310" rx="4" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="570" y="60" width="200" height="140" rx="4" fill="#944a32" opacity="0.1" />
      <text x="580" y="90" fill="#944a32" fontSize="10" fontFamily="monospace">PENTHOUSE · 12F</text>
      <text x="580" y="115" fill="#ffffff" fontSize="20" fontFamily="serif" fontStyle="italic">₹4.2 Cr</text>
      <text x="580" y="135" fill="#555" fontSize="9" fontFamily="monospace">3 BHK · 1,840 sq ft</text>
      <text x="580" y="150" fill="#555" fontSize="9" fontFamily="monospace">South Delhi, New Delhi</text>

      <line x1="580" y1="165" x2="760" y2="165" stroke="#1e1e1e" strokeWidth="1" />

      {["Garden view", "Modular kitchen", "2 covered parking", "Gym + Pool"].map((f, i) => (
        <text key={f} x="580" y={185 + i * 18} fill="#444" fontSize="9" fontFamily="monospace">→ {f}</text>
      ))}

      <rect x="580" y="330" width="160" height="28" rx="2" fill="#944a32" opacity="0.9" />
      <text x="660" y="348" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">Book a visit →</text>

      {/* Title */}
      <text x="40" y="408" fill="#ffffff" fontSize="22" fontFamily="serif" fontStyle="italic" fontWeight="500">Major Realties</text>
      <text x="40" y="428" fill="#555" fontSize="10" fontFamily="monospace">Real estate · GSAP · React</text>
    </svg>
  )
}

export function WroomCard() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Speed lines */}
      {[80, 120, 160, 200, 240, 280, 320].map((y, i) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2={300 - i * 10}
          y2={y}
          stroke="#1a1a1a"
          strokeWidth={i === 3 ? 2 : 1}
          opacity={1 - i * 0.1}
        />
      ))}

      {/* Browser chrome mockup */}
      <rect x="200" y="50" width="560" height="360" rx="8" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="200" y="50" width="560" height="36" rx="8" fill="#1a1a1a" />
      <rect x="200" y="74" width="560" height="12" fill="#1a1a1a" />

      {/* Traffic lights in browser */}
      <circle cx="220" cy="68" r="5" fill="#ff5f57" />
      <circle cx="236" cy="68" r="5" fill="#febc2e" />
      <circle cx="252" cy="68" r="5" fill="#28c840" />

      {/* URL bar */}
      <rect x="270" y="59" width="300" height="18" rx="3" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="280" y="72" fill="#555" fontSize="9" fontFamily="monospace">wroom.raghav-verma.com</text>

      {/* Page content mockup */}
      {/* Hero text */}
      <rect x="230" y="100" width="200" height="20" rx="2" fill="#1e1e1e" />
      <rect x="230" y="128" width="280" height="12" rx="2" fill="#161616" />
      <rect x="230" y="148" width="240" height="12" rx="2" fill="#161616" />

      {/* CTA button */}
      <rect x="230" y="172" width="100" height="28" rx="3" fill="#944a32" opacity="0.9" />
      <text x="280" y="190" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">Get started</text>

      {/* Feature cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={230 + i * 168} y="230" width="148" height="100" rx="4" fill="#161616" stroke="#1e1e1e" strokeWidth="1" />
          <rect x={240 + i * 168} y="245" width="24" height="24" rx="3" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
          <rect x={240 + i * 168} y="280" width="80" height="8" rx="2" fill="#1e1e1e" />
          <rect x={240 + i * 168} y="296" width="110" height="6" rx="2" fill="#161616" />
          <rect x={240 + i * 168} y="308" width="90" height="6" rx="2" fill="#161616" />
        </g>
      ))}

      {/* Nav items */}
      {["Product", "Pricing", "Docs", "Blog"].map((item, i) => (
        <text key={item} x={590 + i * 48} y="72" fill="#444" fontSize="9" fontFamily="monospace">{item}</text>
      ))}

      {/* Title */}
      <text x="40" y="350" fill="#ffffff" fontSize="34" fontFamily="serif" fontStyle="italic" fontWeight="500">Wroom</text>
      <text x="40" y="378" fill="#555" fontSize="11" fontFamily="monospace">Product landing · Next.js</text>

      {/* Accent dot */}
      <circle cx="155" cy="338" r="5" fill="#944a32" />

      {/* Tags */}
      {["Next.js", "TypeScript", "CSS"].map((t, i) => (
        <g key={t}>
          <rect x={40 + i * 96} y="395" width="80" height="20" rx="2" fill="#1a1a1a" />
          <text x={40 + i * 96 + 40} y="409" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function RepoGremlinCard() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />

      {/* Background grid */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="450" stroke="#111" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#111" strokeWidth="1" />
      ))}

      {/* Terminal window */}
      <rect x="40" y="50" width="420" height="300" rx="6" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="40" y="50" width="420" height="32" rx="6" fill="#1a1a1a" />
      <rect x="40" y="70" width="420" height="12" fill="#1a1a1a" />
      <circle cx="60" cy="66" r="5" fill="#ff5f57" />
      <circle cx="76" cy="66" r="5" fill="#febc2e" />
      <circle cx="92" cy="66" r="5" fill="#28c840" />
      <text x="220" y="70" textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace">claw — zsh</text>

      {/* Terminal lines */}
      <text x="56" y="104" fill="#555" fontSize="9" fontFamily="monospace">~ $</text>
      <text x="78" y="104" fill="#39d353" fontSize="9" fontFamily="monospace">claw analyze</text>
      <text x="56" y="122" fill="#444" fontSize="9" fontFamily="monospace">→ scanning repository structure...</text>
      <text x="56" y="140" fill="#444" fontSize="9" fontFamily="monospace">→ indexing 47 source files</text>
      <text x="56" y="158" fill="#444" fontSize="9" fontFamily="monospace">→ detecting stack: Rust · Python · TypeScript</text>
      <text x="56" y="176" fill="#67d4f8" fontSize="9" fontFamily="monospace">  entrypoints: rust/crates/rusty-claude-cli/src/main.rs</text>
      <text x="56" y="194" fill="#67d4f8" fontSize="9" fontFamily="monospace">  risky areas: src/migrations, src/voice</text>

      <line x1="56" y1="204" x2="444" y2="204" stroke="#1e1e1e" strokeWidth="1" />

      <text x="56" y="220" fill="#555" fontSize="9" fontFamily="monospace">~ $</text>
      <text x="78" y="220" fill="#39d353" fontSize="9" fontFamily="monospace">claw plan "add rate limiting to API"</text>
      <text x="56" y="238" fill="#444" fontSize="9" fontFamily="monospace">→ reading context from .claw/sessions/...</text>
      <text x="56" y="256" fill="#67d4f8" fontSize="9" fontFamily="monospace">  1. src/api/middleware.rs — add RateLimiter</text>
      <text x="56" y="274" fill="#67d4f8" fontSize="9" fontFamily="monospace">  2. rust/crates/api/src/lib.rs — expose config</text>
      <text x="56" y="292" fill="#67d4f8" fontSize="9" fontFamily="monospace">  3. tests/integration/api_test.rs — add test</text>

      <text x="56" y="316" fill="#555" fontSize="9" fontFamily="monospace">~ $</text>
      <rect x="78" y="305" width="7" height="13" rx="1" fill="#39d353" opacity="0.8" />

      {/* Right panel — architecture map */}
      <rect x="500" y="50" width="260" height="300" rx="6" fill="#111" stroke="#1e1e1e" strokeWidth="1" />
      <text x="515" y="74" fill="#333" fontSize="9" fontFamily="monospace">REPO MAP</text>
      <line x1="500" y1="80" x2="760" y2="80" stroke="#1e1e1e" strokeWidth="1" />

      {/* Tree structure */}
      {[
        { x: 515, y: 100, label: "repogremlin/", color: "#944a32" },
        { x: 530, y: 118, label: "rust/", color: "#555" },
        { x: 545, y: 136, label: "crates/", color: "#444" },
        { x: 560, y: 154, label: "rusty-claude-cli", color: "#67d4f8" },
        { x: 545, y: 172, label: "api/", color: "#444" },
        { x: 545, y: 190, label: "runtime/", color: "#444" },
        { x: 530, y: 208, label: "src/", color: "#555" },
        { x: 545, y: 226, label: "migrations/", color: "#444" },
        { x: 545, y: 244, label: "voice/", color: "#444" },
        { x: 530, y: 262, label: "scripts/", color: "#555" },
        { x: 530, y: 280, label: "tests/", color: "#555" },
      ].map(({ x, y, label, color }) => (
        <text key={label} x={x} y={y} fill={color} fontSize="9" fontFamily="monospace">{label}</text>
      ))}

      {/* Under construction banner */}
      <rect x="40" y="370" width="720" height="50" rx="4" fill="#1a1208" stroke="#c8a96e" strokeWidth="1" opacity="0.95" />
      <text x="400" y="390" textAnchor="middle" fill="#c8a96e" fontSize="10" fontFamily="monospace" letterSpacing="3">UNDER CONSTRUCTION</text>
      <text x="400" y="408" textAnchor="middle" fill="#7a6540" fontSize="9" fontFamily="monospace">flagship project · active development</text>

      {/* Title */}
      <text x="40" y="438" fill="#444" fontSize="11" fontFamily="monospace">Rust · Python · CLI · AI Agents</text>
    </svg>
  )
}

export function AutoClipCard() {
  // Pose skeleton joints (a stylised bowler at release)
  const joints: Record<string, [number, number]> = {
    head: [150, 110], neck: [150, 135], lShoulder: [125, 150], rShoulder: [175, 150],
    lElbow: [110, 185], rElbow: [190, 120], lWrist: [120, 220], rWrist: [205, 90],
    hip: [150, 215], lKnee: [130, 270], rKnee: [175, 265], lAnkle: [125, 320], rAnkle: [185, 315],
  }
  const bones: [string, string][] = [
    ["head", "neck"], ["neck", "lShoulder"], ["neck", "rShoulder"],
    ["lShoulder", "lElbow"], ["lElbow", "lWrist"], ["rShoulder", "rElbow"], ["rElbow", "rWrist"],
    ["neck", "hip"], ["hip", "lKnee"], ["lKnee", "lAnkle"], ["hip", "rKnee"], ["rKnee", "rAnkle"],
  ]

  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="450" stroke="#111" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#111" strokeWidth="1" />
      ))}

      {/* Detection frame with pose skeleton */}
      <rect x="40" y="60" width="280" height="300" rx="6" fill="#0a0a0a" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="40" y="60" width="280" height="22" fill="#141414" />
      <text x="54" y="75" fill="#555" fontSize="9" fontFamily="monospace">frame 891 · release</text>
      <circle cx="305" cy="71" r="4" fill="#ff5f57" />

      {/* Bounding box */}
      <rect x="95" y="95" width="130" height="240" rx="3" fill="none" stroke="#39d353" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
      <rect x="95" y="86" width="68" height="14" rx="2" fill="#39d353" opacity="0.85" />
      <text x="100" y="96" fill="#062b12" fontSize="8" fontFamily="monospace" fontWeight="bold">bowler 0.96</text>

      {bones.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={joints[a][0]} y1={joints[a][1]} x2={joints[b][0]} y2={joints[b][1]} stroke="#67d4f8" strokeWidth="2" opacity="0.85" />
      ))}
      {Object.entries(joints).map(([k, [x, y]]) => (
        <circle key={k} cx={x} cy={y} r="3.5" fill="#944a32" />
      ))}

      {/* Ball trajectory */}
      <path d="M 210 90 Q 260 130 250 230" fill="none" stroke="#c8a96e" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />
      <circle cx="250" cy="230" r="4" fill="#c8a96e" />

      {/* Right panel — clip output filmstrip */}
      <text x="360" y="100" fill="#333" fontSize="9" fontFamily="monospace">AUTO-CLIPPED OUTPUT</text>
      <line x1="360" y1="108" x2="760" y2="108" stroke="#1e1e1e" strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={360 + i * 100} y="125" width="88" height="60" rx="3" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
          <rect x={360 + i * 100} y="125" width="88" height="60" rx="3" fill="#944a32" opacity={0.06 + i * 0.02} />
          <text x={404 + i * 100} y="160" textAnchor="middle" fill="#444" fontSize="16" fontFamily="serif">▶</text>
          <text x={360 + i * 100} y="200" fill="#555" fontSize="8" fontFamily="monospace">delivery_{i + 1}</text>
        </g>
      ))}

      {/* Metadata block */}
      <rect x="360" y="220" width="400" height="92" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="374" y="240" fill="#555" fontSize="9" fontFamily="monospace">// metadata.json</text>
      <text x="374" y="258" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  release_frame: "}<tspan fill="#39d353">891</tspan><tspan>,</tspan></text>
      <text x="374" y="274" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  speed_kmh: "}<tspan fill="#67d4f8">134.2</tspan><tspan>,  bowling_end: </tspan><tspan fill="#944a32">'left'</tspan></text>
      <text x="374" y="290" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  delivery_length: "}<tspan fill="#c8a96e">'good_length'</tspan></text>
      <text x="374" y="306" fill="#c8c8c8" fontSize="9" fontFamily="monospace">{"  trajectory_type: "}<tspan fill="#c8a96e">'swing'</tspan></text>

      {/* Title */}
      <text x="360" y="356" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">AutoClip</text>
      <text x="360" y="376" fill="#555" fontSize="11" fontFamily="monospace">Cricket event detection · CV</text>
      {["PyTorch", "YOLO Pose", "OpenCV"].map((t, i) => (
        <g key={t}>
          <rect x={360 + i * 96} y="395" width="88" height="20" rx="2" fill="#1a1a1a" />
          <text x={360 + i * 96 + 44} y="409" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function PhalanxCard() {
  const phases = ["clone", "detect", "sbom", "scan", "triage", "graph", "policy"]
  const findings = [
    { sev: "CRIT", n: 3, color: "#ff5f57" },
    { sev: "HIGH", n: 11, color: "#febc2e" },
    { sev: "MED", n: 24, color: "#67d4f8" },
    { sev: "LOW", n: 38, color: "#3d3d3d" },
  ]
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="450" stroke="#111" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#111" strokeWidth="1" />
      ))}

      {/* Shield emblem */}
      <path d="M 130 60 L 200 84 L 200 170 Q 200 230 130 260 Q 60 230 60 170 L 60 84 Z"
        fill="#1a0a0a" stroke="#944a32" strokeWidth="1.5" opacity="0.9" />
      <path d="M 100 158 L 122 182 L 165 130" fill="none" stroke="#39d353" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="130" y="295" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">policy: PASS</text>

      {/* Pipeline phases */}
      <text x="250" y="80" fill="#333" fontSize="9" fontFamily="monospace">SCAN PIPELINE</text>
      {phases.map((p, i) => (
        <g key={p}>
          <rect x={250 + i * 72} y="92" width="62" height="26" rx="3" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
          <text x={250 + i * 72 + 31} y="109" textAnchor="middle" fill="#67d4f8" fontSize="8" fontFamily="monospace">{p}</text>
          {i < phases.length - 1 && (
            <line x1={250 + i * 72 + 62} y1="105" x2={250 + (i + 1) * 72} y2="105" stroke="#944a32" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
          )}
        </g>
      ))}

      {/* Findings severity bars */}
      <text x="250" y="155" fill="#333" fontSize="9" fontFamily="monospace">FINDINGS · triaged</text>
      {findings.map((f, i) => (
        <g key={f.sev}>
          <text x="250" y={180 + i * 26} fill="#777" fontSize="9" fontFamily="monospace">{f.sev}</text>
          <rect x="300" y={171 + i * 26} width={f.n * 8} height="14" rx="2" fill={f.color} opacity="0.85" />
          <text x={308 + f.n * 8} y={182 + i * 26} fill="#666" fontSize="9" fontFamily="monospace">{f.n}</text>
        </g>
      ))}

      {/* Reachability graph */}
      <rect x="540" y="160" width="230" height="150" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="554" y="180" fill="#555" fontSize="9" fontFamily="monospace">reachability graph</text>
      {[
        { x: 575, y: 215, label: "entry", c: "#39d353" },
        { x: 660, y: 205, label: "route", c: "#67d4f8" },
        { x: 660, y: 255, label: "svc", c: "#67d4f8" },
        { x: 735, y: 230, label: "sink", c: "#ff5f57" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="6" fill={n.c} opacity="0.9" />
          <text x={n.x} y={n.y + 20} textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace">{n.label}</text>
        </g>
      ))}
      <line x1="581" y1="213" x2="654" y2="206" stroke="#944a32" strokeWidth="1" />
      <line x1="581" y1="217" x2="654" y2="253" stroke="#944a32" strokeWidth="1" />
      <line x1="666" y1="207" x2="729" y2="228" stroke="#944a32" strokeWidth="1" />
      <line x1="666" y1="253" x2="729" y2="232" stroke="#944a32" strokeWidth="1" />
      <text x="554" y="300" fill="#ff5f57" fontSize="8" fontFamily="monospace">CWE-89 · reachable · CVSS 9.8</text>

      {/* Title */}
      <text x="40" y="356" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">Phalanx</text>
      <text x="40" y="376" fill="#555" fontSize="11" fontFamily="monospace">Autonomous AppSec platform</text>
      {["Go", "Python", "Next.js"].map((t, i) => (
        <g key={t}>
          <rect x={40 + i * 86} y="395" width="78" height="20" rx="2" fill="#1a1a1a" />
          <text x={40 + i * 86 + 39} y="409" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function ForgeCard() {
  const operators = [
    { label: "HR", y: 110 }, { label: "Finance", y: 150 }, { label: "Marketing", y: 190 },
    { label: "Support", y: 230 }, { label: "Data", y: 270 },
  ]
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="450" fill="#0d0d0d" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="450" stroke="#111" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#111" strokeWidth="1" />
      ))}

      {/* Operators column */}
      <text x="56" y="90" fill="#333" fontSize="9" fontFamily="monospace">OPERATORS</text>
      {operators.map((op) => (
        <g key={op.label}>
          <rect x="56" y={op.y} width="120" height="28" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
          <circle cx="74" cy={op.y + 14} r="4" fill="#39d353" opacity="0.8" />
          <text x="88" y={op.y + 18} fill="#c8c8c8" fontSize="10" fontFamily="monospace">{op.label}</text>
          <line x1="176" y1={op.y + 14} x2="300" y2="225" stroke="#944a32" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
        </g>
      ))}

      {/* Approval gate */}
      <rect x="300" y="185" width="150" height="80" rx="6" fill="#1a1208" stroke="#c8a96e" strokeWidth="1.5" />
      <text x="375" y="210" textAnchor="middle" fill="#c8a96e" fontSize="11" fontFamily="monospace">APPROVAL</text>
      <text x="375" y="226" textAnchor="middle" fill="#c8a96e" fontSize="11" fontFamily="monospace">GATE</text>
      <text x="375" y="248" textAnchor="middle" fill="#7a6540" fontSize="8" fontFamily="monospace">requiresApproval ✓</text>

      {/* Gate -> outcomes */}
      <line x1="450" y1="210" x2="540" y2="170" stroke="#39d353" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="450" y1="240" x2="540" y2="300" stroke="#944a32" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Execute + audit */}
      <rect x="540" y="150" width="220" height="44" rx="4" fill="#0a1f12" stroke="#2e7d32" strokeWidth="1" />
      <text x="556" y="170" fill="#39d353" fontSize="10" fontFamily="monospace">execute tool</text>
      <text x="556" y="185" fill="#3a6b48" fontSize="8" fontFamily="monospace">staged write · verified (tsc + eslint)</text>

      <rect x="540" y="270" width="220" height="70" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <text x="556" y="290" fill="#555" fontSize="9" fontFamily="monospace">// audit.jsonl (append-only)</text>
      <text x="556" y="307" fill="#c8c8c8" fontSize="8" fontFamily="monospace">{"{ action: 'invoice.create',"}</text>
      <text x="556" y="321" fill="#c8c8c8" fontSize="8" fontFamily="monospace">{"  approved_by: 'principal',"}</text>
      <text x="556" y="335" fill="#c8c8c8" fontSize="8" fontFamily="monospace">{"  outcome: 'ok' }"}</text>

      {/* Title */}
      <text x="40" y="372" fill="#ffffff" fontSize="28" fontFamily="serif" fontStyle="italic" fontWeight="500">Forge</text>
      <text x="40" y="392" fill="#555" fontSize="11" fontFamily="monospace">Autonomous operator runtime</text>
      {["TypeScript", "LLM Tool-Use", "VS Code"].map((t, i) => (
        <g key={t}>
          <rect x={360 + i * 104} y="378" width="96" height="20" rx="2" fill="#1a1a1a" />
          <text x={360 + i * 104 + 48} y="392" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export const PROJECT_CARDS: Record<string, React.FC> = {
  "Meridian":        MeridianCard,
  "DevTrackr":       DevTrackrCard,
  "FilmMuse":        FilmMuseCard,
  "Major Realites":  MajorRealitiesCard,
  "Wroom Inc":       WroomCard,
  "RepoGremlin":     RepoGremlinCard,
  "AutoClip":        AutoClipCard,
  "Phalanx":         PhalanxCard,
  "Forge":           ForgeCard,
}
