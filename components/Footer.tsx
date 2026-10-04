import { site } from "@/content/site";
import { TextLink } from "@/components/TextLink";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Résumé", href: site.links.resume },
];

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="mt-14 scroll-mt-18 border-t border-line sm:mt-18"
    >
      <div className="mx-auto max-w-page px-5 py-12">
        <h2 id="contact-title" className="text-sm font-medium text-muted">
          Contact
        </h2>
        <p className="mt-4 text-fg">The quickest way to reach me is email.</p>
        <p className="mt-1">
          <TextLink
            href={`mailto:${site.email}`}
            className="text-lg text-accent transition-colors hover:text-accent-hover"
          >
            {site.email}
          </TextLink>
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <TextLink
                href={link.href}
                className="text-accent transition-colors hover:text-accent-hover"
              >
                {link.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[13px] text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
