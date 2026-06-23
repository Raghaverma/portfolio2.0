"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RING_IDLE = "#4a463e"; // ink-gray, visible on paper
const RING_HOT = "#9a5e00"; // deep amber

/**
 * Industrial crosshair cursor.
 * - A precise center dot (instant) + a lagged ring (lerped).
 * - Grows + locks onto interactive elements (a, button, [data-cursor]).
 * - Click fires an expanding amber ripple at the pointer.
 * - Disabled entirely on touch / coarse pointers and reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const html = document.documentElement;
    html.setAttribute("data-custom-cursor", "on");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const ripple = rippleRef.current!;
    gsap.set([dot, ring, ripple], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { borderColor: RING_IDLE });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2" });

    let lx = 0;
    let ly = 0;
    let visible = false;
    const move = (e: MouseEvent) => {
      lx = e.clientX;
      ly = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      !!el.closest('a, button, [data-cursor], input, textarea, [role="button"]');

    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1.9, borderColor: RING_HOT, duration: 0.3 });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      }
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1, borderColor: RING_IDLE, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };
    const leave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    // click ripple
    const down = () => {
      gsap.set(ripple, { x: lx, y: ly, scale: 0, opacity: 0.55 });
      gsap.to(ripple, { scale: 3, opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(dot, { scale: 1.9 }, { scale: dot.dataset.hot ? 0.4 : 1, duration: 0.4, ease: "power2.out" });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);

    return () => {
      html.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={rippleRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-amber"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border"
        style={{ willChange: "transform", borderColor: RING_IDLE }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-amber"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
