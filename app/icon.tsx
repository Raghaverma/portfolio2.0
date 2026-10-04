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
          background: "#f7f5f1",
          color: "#1c1a16",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-1px",
          borderRadius: 12,
          border: "4px solid #945b00",
        }}
      >
        RV
      </div>
    ),
    { ...size },
  );
}
