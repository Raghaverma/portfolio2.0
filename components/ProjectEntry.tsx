import type { FeaturedProject, Table } from "@/content/projects";
import { TextLink } from "@/components/TextLink";

function ResultsTable({ table }: { table: Table }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm tabular-nums">
        <caption className="mb-2 text-left font-medium text-fg">{table.caption}</caption>
        <thead>
          <tr>
            {table.columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className="whitespace-nowrap border-b border-line py-2 pr-4 font-medium text-muted last:pr-0"
              >
                {column || <span className="sr-only">Measure</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th
                    key={i}
                    scope="row"
                    className="border-b border-line py-2 pr-4 font-normal text-fg"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="border-b border-line py-2 pr-4 text-fg last:pr-0">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProjectEntry({ project }: { project: FeaturedProject }) {
  const titleId = `${project.slug}-title`;
  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      className="scroll-mt-18 py-5 first:pt-0 last:pb-0"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={titleId} className="text-[19px] font-semibold text-fg">
          {project.name}
        </h3>
        <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
          <span className="flex items-center gap-2">
            {project.live && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
            {project.tag}
          </span>
          {project.links.map((link) => (
            <TextLink key={link.href} href={link.href} className="link">
              {link.label}
              <span aria-hidden> ↗</span>
            </TextLink>
          ))}
        </p>
      </header>

      <p className="mt-2 text-pretty text-fg">{project.summary}</p>

      <ul className="mt-4 space-y-2 text-[15px] text-muted">
        {project.highlights.map((highlight) => (
          <li key={highlight.text} className="flex gap-3">
            <span aria-hidden className="flex h-[1lh] shrink-0 items-center">
              <span className="h-px w-3 bg-muted/50" />
            </span>
            <span>
              {highlight.figure && (
                <>
                  <strong className="font-semibold tabular-nums text-fg">{highlight.figure}</strong>{" "}
                </>
              )}
              {highlight.text}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-mono text-[13px] leading-relaxed text-muted">
        {project.stack.join(" · ")}
      </p>

      <details className="group mt-4">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-150 group-open:rotate-90"
          >
            <path
              d="M6 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Details
        </summary>
        <div className="mt-3 rounded-md bg-surface p-4 sm:p-5">
          <ul className="list-disc space-y-2 pl-4 text-[15px] text-muted marker:text-muted/60">
            {project.details.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          {project.details.table && <ResultsTable table={project.details.table} />}
        </div>
      </details>
    </article>
  );
}
