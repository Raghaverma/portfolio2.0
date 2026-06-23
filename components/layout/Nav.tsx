"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 320 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`border-b transition-colors duration-500 ${
          scrolled
            ? "border-line bg-base/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="container-px flex h-16 items-center justify-between">
          {/* Monogram */}
          <Link
            href="/"
            data-cursor
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="flex h-8 w-8 items-center justify-center border border-line-bright font-mono text-sm font-bold text-amber transition-colors group-hover:border-amber">
              RV
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:block">
              {site.role}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor
                className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
              >
                <span className="text-[10px] text-amber/60 group-hover:text-amber">
                  {item.index}
                </span>
                {item.label}
              </Link>
            ))}
            <a
              href={site.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="flex items-center gap-2 border border-line-bright px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fg transition-colors hover:border-amber hover:text-amber"
            >
              Résumé
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-6 bg-fg transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-fg transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-px flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-line/60 py-4 font-mono text-sm uppercase tracking-[0.14em] text-fg"
            >
              <span className="text-xs text-amber">{item.index}</span>
              {item.label}
            </Link>
          ))}
          <a
            href={site.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-amber px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-amber-ink"
          >
            Download Résumé →
          </a>
        </div>
      </div>
    </header>
  );
}
