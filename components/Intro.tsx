import { site } from "@/content/site";
import { TextLink } from "@/components/TextLink";
import { PoseFigure } from "@/components/PoseFigure";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Résumé", href: site.links.resume },
];

export function Intro() {
  return (
    <section id="top" aria-label="Introduction" className="flow-root scroll-mt-18 pt-14 sm:pt-20">
      <PoseFigure className="float-right mb-2 ml-4 w-20 sm:ml-8 sm:w-36" />
      <h1 className="text-[26px] font-semibold leading-tight text-fg sm:text-[28px]">
        {site.name}
      </h1>
      <p className="mt-1 text-fg">{site.role}</p>
      <p className="mt-4 text-pretty text-fg">{site.intro}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        <span>{site.availability}</span>
        <span aria-hidden>·</span>
        <span>{site.location}</span>
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <TextLink href={link.href} className="link">
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
