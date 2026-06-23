"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; bx: number; by: number; vx: number; vy: number };

/**
 * Interactive blueprint node-field.
 * A loose grid of nodes drifts gently; near the pointer they brighten to
 * amber and wire up to their neighbours. Canvas 2D, DPR-aware, pauses when
 * offscreen/hidden, and renders a single static frame under reduced-motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const GAP = 56; // grid spacing in px
    const LINK = 78; // max link distance
    const MOUSE_R = 170; // pointer influence radius

    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const jitter = GAP * 0.22;
          const bx = i * GAP + (Math.sin(i * 12.9 + j * 4.1) * jitter);
          const by = j * GAP + (Math.cos(i * 3.7 + j * 9.2) * jitter);
          nodes.push({ x: bx, y: by, bx, by, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        // drift back toward base position (spring) + slight pointer push
        const dxm = n.x - mouse.x;
        const dym = n.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < MOUSE_R && dm > 0.01) {
          const push = (1 - dm / MOUSE_R) * 1.4;
          n.vx += (dxm / dm) * push;
          n.vy += (dym / dm) * push;
        }
        n.vx += (n.bx - n.x) * 0.012;
        n.vy += (n.by - n.y) * 0.012;
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const near = a.x > -LINK && a.x < w + LINK && a.y > -LINK && a.y < h + LINK;
        if (!near) continue;
        for (let k = i + 1; k < nodes.length; k++) {
          const b = nodes[k];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const md = Math.hypot(mx - mouse.x, my - mouse.y);
          const hot = md < MOUSE_R ? 1 - md / MOUSE_R : 0;
          const baseAlpha = (1 - d / LINK) * 0.22;
          if (hot > 0.02) {
            ctx.strokeStyle = `rgba(154,94,0,${(baseAlpha + 0.12) * hot})`;
          } else {
            ctx.strokeStyle = `rgba(40,36,30,${baseAlpha})`;
          }
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const hot = md < MOUSE_R ? 1 - md / MOUSE_R : 0;
        if (hot > 0.05) {
          ctx.fillStyle = `rgba(154,94,0,${0.4 + hot * 0.55})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.4 + hot * 1.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(40,36,30,0.32)";
          ctx.fillRect(n.x - 0.7, n.y - 0.7, 1.4, 1.4);
        }
      }
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    draw(); // paint one frame immediately (also the reduced-motion frame)
    start();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    const onResize = () => {
      build();
      draw();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ maskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, #000 55%, transparent 100%)" }}
    />
  );
}
