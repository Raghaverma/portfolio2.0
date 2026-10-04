import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          color: "#1c1a16",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5f5a51" }}>raghav-verma.com</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 44, color: "#945b00" }}>
            {site.role}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5f5a51" }}>
          {`${site.availability} · ${site.location}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
