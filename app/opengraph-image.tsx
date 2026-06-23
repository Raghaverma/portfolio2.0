import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f1",
          backgroundImage:
            "linear-gradient(#e6e2d9 1px, transparent 1px), linear-gradient(90deg, #e6e2d9 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              border: "3px solid #9a5e00",
              color: "#9a5e00",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            RV
          </div>
          <div style={{ display: "flex", color: "#6b665d", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            Portfolio · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#191713", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Building systems that
          </div>
          <div style={{ display: "flex", color: "#9a5e00", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            survive the real world.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#6b665d", fontSize: 26 }}>
          <span style={{ color: "#191713" }}>{site.name}</span>
          <span>{site.role} · {site.location}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
