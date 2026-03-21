import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Raghav Verma — Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf9f7",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, color: "#655d59", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            The Digital Atelier
          </span>
          <span style={{ fontSize: 14, color: "#afb3b0", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            raghav-verma.com
          </span>
        </div>

        {/* Main content */}
        <div>
          <div style={{ fontSize: 18, color: "#944a32", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 24 }}>
            Developer &amp; Architect
          </div>
          <div style={{ fontSize: 96, color: "#2f3331", lineHeight: 0.9, fontWeight: 300 }}>
            Raghav
          </div>
          <div style={{ fontSize: 96, color: "#944a32", lineHeight: 0.9, fontStyle: "italic" }}>
            Verma
          </div>
          <div style={{ fontSize: 22, color: "#5c605d", marginTop: 40, maxWidth: 600, lineHeight: 1.5, fontFamily: "sans-serif", fontWeight: 300 }}>
            Building high-performance web applications through modern architecture, clean code, and intentional design.
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", gap: 40 }}>
          {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
            <span key={tech} style={{ fontSize: 13, color: "#afb3b0", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  )
}
