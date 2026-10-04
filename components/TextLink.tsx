import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & { href: string };

// Web pages and the résumé PDF open in a new tab; mailto and in-page links stay put.
export function TextLink({ href, children, ...rest }: Props) {
  const newTab = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
