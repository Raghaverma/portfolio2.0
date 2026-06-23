"use client";

import { HeroCanvas } from "@/components/fx/HeroCanvas";
import { TextReveal } from "@/components/fx/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

const facts = [
  { k: "Now", v: "SDE · Khel.AI" },
  { k: "Focus", v: "Real-time · CV · Tooling" },
  { k: "Based", v: site.location },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
      </div>

      <div className="container-px w-full">
        {/* Status line */}
        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="flex items-center gap-2 text-fg-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            {site.availabilityNote}
          </span>
          <span className="text-ghost">/</span>
          <span>{site.timezone}</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-[16ch] text-[clamp(2.75rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-fg">
          <TextReveal as="span" text="Building systems" trigger={false} className="block" delay={0.15} />
          <TextReveal as="span" text="that survive the" trigger={false} className="block" delay={0.28} />
          <span className="block">
            <TextReveal
              as="span"
              text="real world."
              trigger={false}
              className="inline-block text-amber glow-amber"
              delay={0.42}
            />
          </span>
        </h1>

        {/* Supporting copy */}
        <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
          <span className="font-medium text-fg">{site.name}</span> — software
          engineer working across real-time systems, computer-vision pipelines,
          and resilient developer tooling. I care about architecture, type
          safety, and interfaces that feel inevitable.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="/#work" variant="primary">
            View selected work
          </ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </div>

      {/* Fact bar */}
      <div className="container-px mt-16 w-full sm:mt-24">
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
