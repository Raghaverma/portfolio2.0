import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-14 scroll-mt-18 sm:mt-18">
      <h2 id={`${id}-title`} className="text-sm font-medium text-muted">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
