"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";

registerGsap();

/**
 * Word-by-word masked reveal for display headings.
 * Each word sits in an overflow-hidden mask and rises into place on scroll.
 */
export function TextReveal({
  text,
  as,
  className,
  delay = 0,
  trigger = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** when false, plays on mount (used for the hero) instead of on scroll */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "h2") as ElementType;
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelectorAll<HTMLElement>("[data-word-inner]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(inner, { yPercent: 110 });
        gsap.to(inner, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
          delay,
          scrollTrigger: trigger
            ? { trigger: el, start: "top 85%", once: true }
            : undefined,
        });
      });
      // reduced-motion: leave words in place (default visible)
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.04em" }}
        >
          <span data-word-inner className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
