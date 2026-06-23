import { SvgShell, NodeBox, Wire, Caption, C, amberFill, amberFillSoft } from "./primitives";

const operators = [
  { y: 56, label: "HR" },
  { y: 100, label: "FINANCE" },
  { y: 144, label: "MARKETING" },
  { y: 188, label: "SUPPORT" },
  { y: 232, label: "DATA" },
  { y: 276, label: "DEV", accent: true },
];

const clients = [
  { x: 300, label: "VS Code" },
  { x: 500, label: "Web Console" },
  { x: 700, label: "CLI" },
];

export function ForgeDiagram() {
  return (
    <SvgShell viewBox="0 0 1040 470">
      {/* operators → event bus */}
      {operators.map((o) => (
        <Wire key={o.label} d={`M 128 ${o.y + 17} H 190`} accent={o.accent} />
      ))}
      {operators.map((o) => (
        <NodeBox key={o.label} x={8} y={o.y} w={120} h={34} title={o.label} accent={o.accent} />
      ))}

      {/* event bus (vertical) */}
      <g data-node>
        <rect x={190} y={56} width={42} height={254} fill={amberFillSoft} stroke={C.nodeStroke} />
        <text
          x={211}
          y={183}
          textAnchor="middle"
          transform="rotate(-90 211 183)"
          fontFamily="var(--font-jetbrains), monospace"
          fontSize={12}
          fill={C.fg}
          style={{ letterSpacing: "0.16em" }}
        >
          EVENT BUS
        </text>
      </g>

      {/* spine */}
      <Wire d="M 232 184 H 300" flow />
      <NodeBox x={300} y={150} w={140} h={68} title="Routine Engine" sub="26 routines · 60s tick" />
      <Wire d="M 440 184 H 478" flow />

      {/* approval gate diamond */}
      <g data-node>
        <path
          d="M 524 184 L 560 150 L 596 184 L 560 218 Z"
          fill={amberFill}
          stroke={C.amber}
          strokeWidth={1.25}
        />
        <text x={560} y={188} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize={11} fill={C.amber} style={{ letterSpacing: "0.06em" }}>
          GATE
        </text>
      </g>
      <Caption x={560} y={244} anchor="middle">Approval-gated execution</Caption>

      <Wire d="M 596 184 H 632" flow accent />
      <NodeBox x={632} y={152} w={118} h={64} title="Verify" sub="tsc · eslint" />
      <Wire d="M 750 184 H 786" flow />
      <NodeBox x={786} y={152} w={104} h={64} title="Apply" />

      {/* audit log */}
      <Wire d="M 890 184 H 912 V 120 H 928" />
      <g data-node>
        <rect x={912} y={92} width={120} height={150} fill={C.nodeFill} stroke={C.nodeStroke} />
        <text x={972} y={112} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize={11} fill={C.fg} style={{ letterSpacing: "0.06em" }}>
          AUDIT LOG
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={924} y={128 + i * 20} width={96} height={1.5} fill={i === 1 ? C.amber : C.wire} />
        ))}
        <text x={972} y={236} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize={8.5} fill={C.faint} style={{ letterSpacing: "0.1em" }}>
          APPEND-ONLY
        </text>
      </g>

      {/* clients strip */}
      <Caption x={8} y={372}>Three front doors</Caption>
      {clients.map((c) => (
        <NodeBox key={c.label} x={c.x} y={388} w={150} h={50} title={c.label} />
      ))}
    </SvgShell>
  );
}
