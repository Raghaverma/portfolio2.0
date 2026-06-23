"use client";

import { useState } from "react";
import { TextReveal } from "@/components/fx/TextReveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { site } from "@/content/site";

const socials = [
  { label: "GitHub", href: site.socials.github, handle: "@Raghaverma" },
  { label: "npm", href: site.socials.npm, handle: "~0xsantoryu" },
  { label: "LinkedIn", href: site.socials.linkedin, handle: "in/raghaverma" },
  { label: "Résumé", href: site.socials.resume, handle: "PDF ↓" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-28 sm:py-36"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

      <div className="container-px">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="text-amber">04</span>
          <span className="h-px w-12 bg-line-bright" />
          <span>Contact</span>
        </div>

        <TextReveal
          as="h2"
          text="Have something hard to build?"
          className="mt-8 max-w-[14ch] text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg"
        />

        <p className="mt-8 max-w-xl text-lg text-muted">
          I&apos;m{" "}
          <span className="text-fg">open to SDE roles</span> and interesting
          collaborations. The fastest way to reach me is email.
        </p>

        {/* Email block */}
        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-6">
          <Magnetic strength={0.2}>
            <a
              href={site.socials.email}
              data-cursor
              className="group inline-flex items-end gap-3 font-display text-[1.35rem] font-medium leading-none tracking-tight text-fg transition-colors hover:text-amber sm:text-[2rem] lg:text-[2.6rem]"
            >
              <span className="break-all sm:break-normal">{site.email}</span>
              <span className="hidden text-amber transition-transform duration-300 group-hover:translate-x-1 sm:inline">
                →
              </span>
            </a>
          </Magnetic>
          <button
            onClick={copy}
            data-cursor
            className="inline-flex w-fit items-center gap-2 border border-line-bright px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-amber hover:text-amber"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {/* Socials */}
        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="group flex items-center justify-between bg-base px-6 py-5 transition-colors hover:bg-surface/60"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted group-hover:text-fg">
                {s.label}
              </span>
              <span className="font-mono text-xs text-faint transition-colors group-hover:text-amber">
                {s.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
