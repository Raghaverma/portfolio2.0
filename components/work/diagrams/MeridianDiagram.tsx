import { SvgShell, NodeBox, Wire, Caption, C, amberFill } from "./primitives";

const flow = [
  { x: 8, title: "Caller", sub: "your service" },
  { x: 180, title: "Adapter", sub: "unified types", accent: true },
  { x: 352, title: "Retry", sub: "backoff" },
  { x: 524, title: "Fallback", sub: "path B" },
  { x: 696, title: "Breaker", sub: "state machine", accent: true },
  { x: 868, title: "Provider", sub: "upstream" },
];
const W = 150;

const providers = ["OpenAI", "Anthropic", "Stripe", "GitHub"];

const MONO = "var(--font-jetbrains), monospace";

function State({ cx, label, accent = false }: { cx: number; label: string; accent?: boolean }) {
  return (
    <g data-node>
      <circle
        cx={cx}
        cy={330}
        r={44}
        fill={accent ? amberFill : C.nodeFill}
        stroke={accent ? C.amber : C.nodeStroke}
        strokeWidth={1.25}
      />
      <text x={cx} y={335} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={accent ? C.amber : C.fg} style={{ letterSpacing: "0.05em" }}>
        {label}
      </text>
    </g>
  );
}

export function MeridianDiagram() {
  return (
    <SvgShell viewBox="0 0 1040 490">
      {/* request flow */}
      {flow.slice(0, -1).map((s, i) => (
        <Wire key={i} d={`M ${s.x + W} 72 H ${flow[i + 1].x}`} flow />
      ))}
      {flow.map((s) => (
        <NodeBox key={s.title} x={s.x} y={40} w={W} h={64} title={s.title} sub={s.sub} accent={s.accent} />
      ))}
      <Caption x={255} y={130} anchor="middle">One typed result, four providers</Caption>

      {/* providers under the provider box */}
      {providers.map((p, i) => (
        <text key={p} x={943} y={130 + i * 17} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={C.muted} style={{ letterSpacing: "0.06em" }}>
          {p}
        </text>
      ))}

      {/* circuit-breaker state machine */}
      <Caption x={560} y={216} anchor="middle">Circuit breaker · state transitions</Caption>
      {/* transitions */}
      <Wire d="M 344 330 Q 430 262 516 330" accent />
      <Wire d="M 604 330 Q 690 262 776 330" accent />
      <Wire d="M 778 360 Q 690 408 602 360" />
      <Wire d="M 820 374 Q 560 470 300 374" />

      <Caption x={430} y={252} anchor="middle">trip</Caption>
      <Caption x={690} y={252} anchor="middle">cooldown</Caption>
      <Caption x={690} y={428} anchor="middle">probe fails</Caption>
      <Caption x={560} y={462} anchor="middle">probe ok → close</Caption>

      <State cx={300} label="CLOSED" />
      <State cx={560} label="OPEN" accent />
      <State cx={820} label="HALF-OPEN" />
    </SvgShell>
  );
}
