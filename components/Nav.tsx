import Link from "next/link";
import { nav, site } from "@/content/site";
import { TextLink } from "@/components/TextLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <nav aria-label="Main" className="mx-auto flex h-13 max-w-page items-center gap-4 px-5">
        <Link
          href="/"
          className="hidden font-medium text-fg transition-colors hover:text-accent min-[480px]:block"
        >
          {site.name}
        </Link>
        <ul className="ml-auto flex items-center gap-2 text-sm text-muted min-[360px]:gap-4 sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-fg">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <TextLink href={site.links.resume} className="transition-colors hover:text-fg">
              Résumé
            </TextLink>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
