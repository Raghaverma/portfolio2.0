import { SvgShell, NodeBox, Wire, Caption, C, amberFill } from "./primitives";

const scanners = [
  { y: 36, label: "SAST" },
  { y: 96, label: "SCA" },
  { y: 156, label: "SECRETS" },
  { y: 216, label: "IaC" },
];

const MONO = "var(--font-jetbrains), monospace";

// reachability graph: nodes + the highlighted reachable path
const gnodes = [
  { id: 0, x: 575, y: 430, tag: "ENTRY" },
  { id: 1, x: 635, y: 372 },
  { id: 2, x: 700, y: 432 },
  { id: 3, x: 690, y: 338 },
  { id: 4, x: 760, y: 372 },
  { id: 5, x: 822, y: 426, tag: "SINK" },
];
const reachable = "M 575 430 L 635 372 L 690 338 L 760 372 L 822 426"; // entry→sink
const sideEdges = [
  "M 635 372 L 700 432",
  "M 700 432 L 822 426",
];

export function PhalanxDiagram() {
  return (
    <SvgShell viewBox="0 0 1040 490">
      {/* repo → scanners (fan-out) */}
      <NodeBox x={8} y={104} w={120} h={64} title="Repo" sub="clone" />
      {scanners.map((s) => (
        <Wire key={s.label} d={`M 128 136 C 170 136, 170 ${s.y + 22}, 200 ${s.y + 22}`} flow />
      ))}
      {scanners.map((s) => (
        <NodeBox key={s.label} x={200} y={s.y} w={150} h={44} title={s.label} />
      ))}
      <Caption x={275} y={300} anchor="middle">Federated scanners</Caption>

      {/* scanners → normalize (merge) */}
      {scanners.map((s) => (
        <Wire key={s.label} d={`M 350 ${s.y + 22} C 390 ${s.y + 22}, 390 168, 430 168`} />
      ))}
      <NodeBox x={430} y={136} w={150} h={64} title="Normalize" sub="one schema" />

      {/* normalize → triage → gate */}
      <Wire d="M 580 168 H 620" flow />
      <NodeBox x={620} y={136} w={160} h={64} title="Triage" sub="no-LLM · rules" accent />
      <Wire d="M 780 168 H 820" flow accent />
      <NodeBox x={820} y={136} w={130} h={64} title="Policy Gate" accent />

      {/* gate → CI outcomes */}
      <Wire d="M 950 158 H 968 V 150 H 980" />
      <Wire d="M 950 178 H 968 V 196 H 980" />
      <g data-node>
        <rect x={980} y={138} width={54} height={24} fill={amberFill} stroke={C.amber} />
        <text x={1007} y={154} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={C.amber}>PASS</text>
        <rect x={980} y={184} width={54} height={24} fill={C.nodeFill} stroke={C.nodeStroke} />
        <text x={1007} y={200} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={C.faint}>FAIL</text>
      </g>

      {/* reachability graph motif under triage */}
      <Wire d="M 700 300 V 240 H 700" />
      <path data-draw d={reachable} fill="none" stroke={C.amber} strokeWidth={1.75} />
      {sideEdges.map((d, i) => (
        <path key={i} data-draw d={d} fill="none" stroke={C.wire} strokeWidth={1} />
      ))}
      {gnodes.map((n) => {
        const onPath = [0, 1, 3, 4, 5].includes(n.id);
        return (
          <g key={n.id} data-node>
            <circle cx={n.x} cy={n.y} r={onPath ? 5 : 4} fill={onPath ? C.amber : C.nodeFill} stroke={onPath ? C.amber : C.wire} />
            {n.tag && (
              <text x={n.x} y={n.y + (n.tag === "ENTRY" ? 18 : -12)} textAnchor="middle" fontFamily={MONO} fontSize={8.5} fill={C.muted} style={{ letterSpacing: "0.1em" }}>
                {n.tag}
              </text>
            )}
          </g>
        );
      })}
      <Caption x={700} y={478} anchor="middle">Reachability → exploitability</Caption>
    </SvgShell>
  );
}
