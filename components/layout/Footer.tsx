import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { label: "GitHub", href: site.socials.github },
  { label: "npm", href: site.socials.npm },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Email", href: site.socials.email },
  { label: "Résumé", href: site.socials.resume },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="container-px py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-line-bright font-mono text-sm font-bold text-amber">
              RV
            </span>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <div className="text-fg-soft">{site.name}</div>
              <div>
                {site.location} · {site.timezone}
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor
                className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-amber"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ghost sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-amber" />
            Built with Next.js · GSAP · TypeScript
          </span>
          <Link href="#top" data-cursor className="transition-colors hover:text-amber">
            ↑ Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
