import { SvgShell, NodeBox, Wire, Pin, Caption, C } from "./primitives";

const stages = [
  { x: 8, title: "Broadcast", sub: "OBS WebSocket" },
  { x: 180, title: "Ingest Edge", sub: "Express · IO" },
  { x: 352, title: "CV Analysis", sub: "YOLOv8 · OpenCV" },
  { x: 524, title: "Delivery Gate", sub: "5-signal fusion", accent: true },
  { x: 696, title: "Clip", sub: "FFmpeg copy" },
  { x: 868, title: "Review", sub: "React tool" },
];

const W = 150;
const signals = [
  { x: 443, label: "WRIST" },
  { x: 521, label: "FOOT" },
  { x: 599, label: "BALL", accent: true },
  { x: 677, label: "REPLAY" },
  { x: 755, label: "SCENE" },
];

export function AutoClipDiagram() {
  return (
    <SvgShell viewBox="0 0 1040 470">
      {/* pipeline wires */}
      {stages.slice(0, -1).map((s, i) => (
        <Wire
          key={i}
          d={`M ${s.x + W} 76 H ${stages[i + 1].x}`}
          flow
        />
      ))}

      {/* pipeline boxes */}
      {stages.map((s) => (
        <NodeBox key={s.title} x={s.x} y={40} w={W} h={72} title={s.title} sub={s.sub} accent={s.accent} />
      ))}

      {/* temporal signals converging into the delivery gate */}
      {signals.map((s) => (
        <Wire
          key={s.label}
          d={`M ${s.x} 286 C ${s.x} 200, 599 200, 599 120`}
          accent={s.accent}
        />
      ))}
      {signals.map((s) => (
        <Pin key={s.label} x={s.x} y={290} label={s.label} accent={s.accent} />
      ))}
      <Caption x={599} y={330} anchor="middle">
        Temporal signals → delivery gate
      </Caption>

      {/* ball-tracking motif (bottom-left) */}
      <Wire d="M 60 440 Q 200 360 340 432" accent />
      <Pin x={60} y={440} label="RELEASE" />
      <Pin x={200} y={378} label="APEX" accent />
      <Pin x={340} y={432} label="PITCH" />
      <Caption x={60} y={460}>Ball tracking · trajectory validation</Caption>

      {/* lossless filmstrip (bottom-right) */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} data-node>
          <rect x={812 + i * 50} y={398} width={42} height={34} fill={C.nodeFill} stroke={C.nodeStroke} />
          <rect x={812 + i * 50} y={394} width={42} height={3} fill={i === 1 ? C.amber : C.wire} />
        </g>
      ))}
      <Caption x={1012} y={460} anchor="end">Stream-copy · lossless</Caption>
    </SvgShell>
  );
}
