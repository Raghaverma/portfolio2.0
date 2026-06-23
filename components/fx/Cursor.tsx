"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AMBER = "#9a5e00";
const AMBER_BRIGHT = "#c2790a";
const GAP = 5;        // px gap from center dot to inner edge of tick
const TICK = 8;       // px tick length at rest
const TICK_HOT = 15;  // px tick length on hover
const THICKNESS = 1.5;

export function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.setAttribute("data-custom-cursor", "on");

    const container = containerRef.current!;
    const dot = dotRef.current!;
    const top = topRef.current!;
    const right = rightRef.current!;
    const bottom = bottomRef.current!;
    const left = leftRef.current!;
    const ripple = rippleRef.current!;

    gsap.set(container, { opacity: 0 });
    gsap.set(ripple, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xC = gsap.quickTo(container, "x", { duration: 0.08, ease: "power3.out" });
    const yC = gsap.quickTo(container, "y", { duration: 0.08, ease: "power3.out" });

    let lx = 0, ly = 0, visible = false;

    const move = (e: MouseEvent) => {
      lx = e.clientX; ly = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to(container, { opacity: 1, duration: 0.25 });
      }
      xC(e.clientX);
      yC(e.clientY);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      !!el.closest('a, button, [data-cursor], input, textarea, [role="button"]');

    const over = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      const scale = TICK_HOT / TICK;
      gsap.to([top, bottom], { scaleY: scale, duration: 0.2, ease: "power2.out" });
      gsap.to([left, right], { scaleX: scale, duration: 0.2, ease: "power2.out" });
      gsap.to([top, right, bottom, left], { opacity: 1, backgroundColor: AMBER_BRIGHT, duration: 0.2 });
      gsap.to(dot, { scale: 1.6, backgroundColor: AMBER_BRIGHT, duration: 0.2 });
    };

    const out = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      gsap.to([top, bottom], { scaleY: 1, duration: 0.25, ease: "power2.out" });
      gsap.to([left, right], { scaleX: 1, duration: 0.25, ease: "power2.out" });
      gsap.to([top, right, bottom, left], { opacity: 0.75, backgroundColor: AMBER, duration: 0.25 });
      gsap.to(dot, { scale: 1, backgroundColor: AMBER, duration: 0.25 });
    };

    const leave = () => {
      visible = false;
      gsap.to(container, { opacity: 0, duration: 0.2 });
    };

    const down = () => {
      // Snap inward then elastic spring back — like a trigger pull
      const contractScale = 0.25;
      const tl = gsap.timeline();
      tl.to([top, bottom], { scaleY: contractScale, duration: 0.1, ease: "power3.in" }, 0)
        .to([left, right], { scaleX: contractScale, duration: 0.1, ease: "power3.in" }, 0)
        .to([top, bottom], { scaleY: 1, duration: 0.55, ease: "elastic.out(1.2, 0.4)" })
        .to([left, right], { scaleX: 1, duration: 0.55, ease: "elastic.out(1.2, 0.4)" }, "<");

      // Amber ripple
      gsap.set(ripple, { x: lx, y: ly, scale: 0, opacity: 0.6 });
      gsap.to(ripple, { scale: 4, opacity: 0, duration: 0.55, ease: "power2.out" });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
    };
  }, []);

  const half = THICKNESS / 2;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="fixed left-0 top-0 rounded-full border border-amber"
        style={{ width: 36, height: 36, willChange: "transform, opacity" }}
      />

      {/* Crosshair — container anchored at cursor position (0×0) */}
      <div
        ref={containerRef}
        className="fixed left-0 top-0"
        style={{ width: 0, height: 0, willChange: "transform" }}
      >
        {/* Center dot */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: AMBER,
            top: -2.5,
            left: -2.5,
          }}
        />

        {/* Top tick — extends upward, origin at bottom (nearest center) */}
        <div
          ref={topRef}
          style={{
            position: "absolute",
            width: THICKNESS,
            height: TICK,
            backgroundColor: AMBER,
            opacity: 0.75,
            left: -half,
            top: -(GAP + TICK),
            transformOrigin: "center bottom",
          }}
        />

        {/* Right tick — extends rightward, origin at left (nearest center) */}
        <div
          ref={rightRef}
          style={{
            position: "absolute",
            width: TICK,
            height: THICKNESS,
            backgroundColor: AMBER,
            opacity: 0.75,
            left: GAP,
            top: -half,
            transformOrigin: "left center",
          }}
        />

        {/* Bottom tick — extends downward, origin at top (nearest center) */}
        <div
          ref={bottomRef}
          style={{
            position: "absolute",
            width: THICKNESS,
            height: TICK,
            backgroundColor: AMBER,
            opacity: 0.75,
            left: -half,
            top: GAP,
            transformOrigin: "center top",
          }}
        />

        {/* Left tick — extends leftward, origin at right (nearest center) */}
        <div
          ref={leftRef}
          style={{
            position: "absolute",
            width: TICK,
            height: THICKNESS,
            backgroundColor: AMBER,
            opacity: 0.75,
            left: -(GAP + TICK),
            top: -half,
            transformOrigin: "right center",
          }}
        />
      </div>
    </div>
  );
}
