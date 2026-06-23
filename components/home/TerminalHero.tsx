"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HeroCanvas } from "@/components/fx/HeroCanvas";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type Line =
  | { t: "cmd"; v: string; gap?: boolean }
  | { t: "name" }
  | { t: "out"; v: string; muted?: boolean }
  | { t: "work" }
  | { t: "actions" };

const LINES: Line[] = [
  { t: "cmd", v: "whoami" },
  { t: "name" },
  { t: "out", v: "New Delhi · IST · open to SDE roles · 2026", muted: true },
  { t: "cmd", v: "cat stack.txt", gap: true },
  { t: "out", v: "real-time systems · computer vision · resilient developer tooling" },
  { t: "cmd", v: "ls ~/work", gap: true },
  { t: "work" },
  { t: "cmd", v: "./say-hi", gap: true },
  { t: "actions" },
];

const Caret = () => (
  <span
    aria-hidden
    className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.12em] bg-amber"
    style={{ animation: "blink 1.05s steps(1) infinite" }}
  />
);

export function TerminalHero() {
  const [revealed, setRevealed] = useState(0); // lines fully printed
  const [typing, setTyping] = useState<{ i: number; n: number } | null>(null);
  const done = revealed >= LINES.length;
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(LINES.length);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const run = () => {
      if (cancelled) return;
      if (i >= LINES.length) return;
      const line = LINES[i];
      if (line.t === "cmd") {
        let n = 0;
        setTyping({ i, n: 0 });
        const tick = () => {
          if (cancelled) return;
          n += 1;
          setTyping({ i, n });
          if (n < line.v.length) {
            timer = setTimeout(tick, 34 + Math.random() * 34);
          } else {
            setTyping(null);
            setRevealed(i + 1);
            i += 1;
            timer = setTimeout(run, 360);
          }
        };
        timer = setTimeout(tick, 120);
      } else {
        setRevealed(i + 1);
        i += 1;
        timer = setTimeout(run, 230);
      }
    };

    timer = setTimeout(run, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const isDone = (i: number) => i < revealed;
  const isActive = (i: number) => typing?.i === i;
  const shown = (i: number) => isDone(i) || isActive(i);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-28"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-40" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
      </div>

      <div className="container-px w-full">
        <div className="mx-auto max-w-3xl">
          {/* kicker */}
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            <span className="flex items-center gap-2 text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Available for SDE roles
            </span>
            <span className="text-ghost">/</span>
            <span>{site.timezone}</span>
          </div>

          {/* terminal */}
          <div className="overflow-hidden border border-line-2 bg-surface shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_24px_60px_-32px_rgba(0,0,0,0.25)]">
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-line bg-surface-2/70 px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className="h-2.5 w-2.5 border border-line-bright" />
                  ))}
                </span>
                <span className="font-mono text-[11px] text-faint">
                  raghav@verma : ~/portfolio
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                zsh
              </span>
            </div>

            {/* body */}
            <div className="min-h-[300px] px-5 py-6 font-mono text-[13px] leading-[1.85] sm:px-8 sm:py-8 sm:text-[15px]">
              {LINES.map((line, i) => {
                const visible = shown(i);
                const base = `transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"} ${
                  line.t === "cmd" && line.gap ? "mt-4" : ""
                }`;

                if (line.t === "cmd") {
                  const text = isActive(i) ? line.v.slice(0, typing!.n) : line.v;
                  return (
                    <div key={i} className={base}>
                      <span className="select-none text-amber">$</span>{" "}
                      <span className="text-fg">{text}</span>
                      {isActive(i) && <Caret />}
                    </div>
                  );
                }

                if (line.t === "name") {
                  return (
                    <div key={i} className={base}>
                      <span className="select-none text-faint">{">"}</span>{" "}
                      <h1 className="inline text-[1.05em] font-semibold tracking-tight text-fg">
                        Raghav Verma
                      </h1>
                      <span className="text-muted"> · Software Engineer</span>
                    </div>
                  );
                }

                if (line.t === "out") {
                  return (
                    <div key={i} className={base}>
                      <span className="select-none text-faint">{">"}</span>{" "}
                      <span className={line.muted ? "text-muted" : "text-fg-soft"}>
                        {line.v}
                      </span>
                    </div>
                  );
                }

                if (line.t === "work") {
                  return (
                    <div key={i} className={`${base} flex flex-wrap items-center gap-x-6 gap-y-1`}>
                      <span className="select-none text-faint">{">"}</span>
                      {projects.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/work/${p.slug}`}
                          data-cursor
                          className="group text-fg transition-colors hover:text-amber"
                        >
                          {p.slug}
                          <span className="text-faint transition-colors group-hover:text-amber">
                            /
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                }

                // actions
                return (
                  <div key={i} className={`${base} flex flex-wrap items-center gap-3`}>
                    <span className="select-none text-faint">{">"}</span>
                    <Link
                      href="/#work"
                      data-cursor
                      className="border border-amber bg-amber px-3 py-1.5 text-amber-ink transition-colors hover:bg-amber-bright"
                    >
                      view work →
                    </Link>
                    <a
                      href={site.socials.email}
                      data-cursor
                      className="border border-line-bright px-3 py-1.5 text-fg transition-colors hover:border-amber hover:text-amber"
                    >
                      email ↗
                    </a>
                  </div>
                );
              })}

              {/* idle prompt once everything has printed */}
              {done && (
                <div className="mt-4">
                  <span className="select-none text-amber">$</span> <Caret />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
