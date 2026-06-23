"use client";

import { HeroCanvas } from "@/components/fx/HeroCanvas";
import { TextReveal } from "@/components/fx/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NowPlaying } from "@/components/home/NowPlaying";
import { site } from "@/content/site";

const facts = [
  { k: "Now", v: "SWE · Khel.AI" },
  { k: "Focus", v: "Real-time · CV · Tooling" },
  { k: "Based", v: site.location },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
      </div>

      <div className="container-px w-full">
        {/* Two-column: bio left, Spotify right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          {/* Left — headline + CTAs */}
          <div>
            <h1 className="text-balance text-[clamp(1.25rem,2.8vw,1.875rem)] font-medium leading-snug tracking-tight text-fg">
              <TextReveal
                as="span"
                text={site.name}
                trigger={false}
                className="font-semibold text-amber glow-amber"
                delay={0.15}
              />
              <TextReveal
                as="span"
                text=" — software engineer working across real-time systems, computer-vision pipelines, and resilient developer tooling. I care about architecture, type safety, and interfaces that feel inevitable."
                trigger={false}
                delay={0.28}
              />
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/#work" variant="primary">
                View selected work
              </ButtonLink>
              <ButtonLink href="/#contact" variant="ghost">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          {/* Right — Spotify */}
          <NowPlaying />
        </div>
      </div>

      {/* Fact bar */}
      <div className="container-px mt-14 w-full sm:mt-20">
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="flex items-baseline gap-3 bg-base px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                {f.k}
              </span>
              <span className="font-mono text-sm text-fg-soft">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
