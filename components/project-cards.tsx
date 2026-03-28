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

export const PROJECT_CARDS: Record<string, React.FC> = {
  "Meridian":        MeridianCard,
  "DevTrackr":       DevTrackrCard,
  "FilmMuse":        FilmMuseCard,
  "Major Realites":  MajorRealitiesCard,
  "Wroom Inc":       WroomCard,
}
