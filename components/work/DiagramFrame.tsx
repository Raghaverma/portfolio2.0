"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";

registerGsap();

/**
 * Industrial diagram frame: corner ticks, a mono caption, and a scroll-driven
 * draw-in for the SVG inside.
 *
 * Animation contract (set these attributes on SVG children):
 *  - [data-draw]  → stroke path that draws itself in (uses getTotalLength)
 *  - [data-node]  → element that fades + scales in, staggered
 *  - [data-flow]  → dashed path that flows continuously (data packets)
 */
export function DiagramFrame({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const draws = root.querySelectorAll<SVGPathElement>("[data-draw]");
        draws.forEach((p) => {
          const len = p.getTotalLength?.() ?? 0;
          if (len) {
            p.style.strokeDasharray = `${len}`;
            p.style.strokeDashoffset = `${len}`;
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        });
        tl.to(draws, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.12,
        });
        tl.from(
          root.querySelectorAll("[data-node]"),
          { opacity: 0, scale: 0.8, transformOrigin: "center", duration: 0.5, stagger: 0.06, ease: "back.out(1.6)" },
          "-=0.8"
        );

        // continuous packet flow
        const flows = root.querySelectorAll<SVGPathElement>("[data-flow]");
        flows.forEach((f) => {
          const len = f.getTotalLength?.() ?? 100;
          f.style.strokeDasharray = `4 ${len}`;
          gsap.fromTo(
            f,
            { strokeDashoffset: len },
            { strokeDashoffset: -4, duration: 2.4, ease: "none", repeat: -1, delay: 1.2 }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative border border-line bg-surface/30 p-4 sm:p-8">
      {/* corner ticks */}
      {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map(
        (pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute ${pos} h-2.5 w-2.5 border-amber/50`}
            style={{
              borderLeftWidth: pos.includes("left") ? 1 : 0,
              borderRightWidth: pos.includes("right") ? 1 : 0,
              borderTopWidth: pos.includes("top") ? 1 : 0,
              borderBottomWidth: pos.includes("bottom") ? 1 : 0,
            }}
          />
        )
      )}

      <div className="overflow-hidden">{children}</div>

      <div className="mt-4 flex items-center gap-3 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        <span className="text-amber">FIG</span>
        <span>{caption}</span>
      </div>
    </div>
  );
}
