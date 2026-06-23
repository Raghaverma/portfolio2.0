"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, registerGsap } from "@/lib/gsap";

registerGsap();

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger direct children instead of revealing the block as one */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Scroll-triggered reveal. Either fades the whole block up, or staggers
 * its direct children. Honors prefers-reduced-motion (renders visible).
 */
export function Reveal({
  children,
  as,
  className,
  stagger = false,
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (gsap.matchMedia) {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const targets = stagger ? Array.from(el.children) : el;
          gsap.from(targets, {
            y,
            opacity: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            stagger: stagger ? 0.08 : 0,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });
        return () => mm.revert();
      }
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export { ScrollTrigger };
