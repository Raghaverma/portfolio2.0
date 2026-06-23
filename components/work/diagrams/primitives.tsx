import type { ReactNode } from "react";

export const C = {
  line: "#dcd8cd",
  wire: "#a59e8f",
  nodeStroke: "#b0a999",
  nodeFill: "#fffefb",
  amber: "#9a5e00",
  amberDim: "rgba(154,94,0,0.12)",
  muted: "#6b665d",
  fg: "#191713",
  faint: "#7e7466",
};

// Accent fills for boxes/states (no glow in the light theme)
export const amberFill = "rgba(154,94,0,0.10)";
export const amberFillSoft = "rgba(154,94,0,0.06)";
export const amberGlow = {}; // intentionally empty — kept as a hook

const MONO = "var(--font-jetbrains), ui-monospace, monospace";

export function NodeBox({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g data-node>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={accent ? amberFill : C.nodeFill}
        stroke={accent ? C.amber : C.nodeStroke}
        strokeWidth={1}
      />
      {/* accent corner tick */}
      <rect x={x} y={y} width={6} height={1.5} fill={accent ? C.amber : C.wire} />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={13}
        fill={accent ? C.amber : C.fg}
        style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={9}
          fill={C.faint}
          style={{ letterSpacing: "0.08em" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function Wire({
  d,
  flow = false,
  accent = false,
}: {
  d: string;
  flow?: boolean;
  accent?: boolean;
}) {
  return (
    <g>
      <path
        data-draw
        d={d}
        fill="none"
        stroke={accent ? C.amber : C.wire}
        strokeWidth={1.25}
        strokeOpacity={accent ? 0.9 : 1}
      />
      {flow && (
        <path data-flow d={d} fill="none" stroke={C.amber} strokeWidth={2.5} strokeLinecap="round" />
      )}
    </g>
  );
}

export function Pin({
  x,
  y,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g data-node>
      <circle cx={x} cy={y} r={4} fill={accent ? C.amber : C.nodeFill} stroke={accent ? C.amber : C.wire} />
      <text x={x} y={y - 12} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={C.muted} style={{ letterSpacing: "0.08em" }}>
        {label}
      </text>
    </g>
  );
}

export function Caption({ x, y, children, anchor = "start" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize={9.5} fill={C.faint} style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
      {children}
    </text>
  );
}

export function SvgShell({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className="h-auto w-full" role="img" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}
