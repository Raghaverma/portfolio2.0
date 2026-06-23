import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f1ea",
          color: "#191713",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "-2px",
          border: "4px solid #9a5e00",
        }}
      >
        RV
      </div>
    ),
    { ...size }
  );
}
