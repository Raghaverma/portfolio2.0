import { DiagramFrame } from "@/components/work/DiagramFrame";
import { AutoClipDiagram } from "./AutoClipDiagram";
import { ForgeDiagram } from "./ForgeDiagram";
import { MeridianDiagram } from "./MeridianDiagram";
import { PhalanxDiagram } from "./PhalanxDiagram";
import type { DiagramKey } from "@/content/projects";

const registry: Record<DiagramKey, { caption: string; Component: () => React.ReactNode }> = {
  autoclip: { caption: "AutoClip · broadcast → auto-clipped delivery pipeline", Component: AutoClipDiagram },
  forge: { caption: "Forge · operator runtime with approval-gated execution", Component: ForgeDiagram },
  meridian: { caption: "Meridian · resilience pipeline + circuit-breaker FSM", Component: MeridianDiagram },
  phalanx: { caption: "Phalanx · deterministic AppSec triage pipeline", Component: PhalanxDiagram },
};

export function ProjectDiagram({ kind }: { kind: DiagramKey }) {
  const entry = registry[kind];
  if (!entry) return null;
  const { caption, Component } = entry;
  return (
    <DiagramFrame caption={caption}>
      <Component />
    </DiagramFrame>
  );
}
