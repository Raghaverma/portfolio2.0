import { ViewTransition } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/fx/Reveal";
import { Counter } from "@/components/fx/Counter";
import { TagRow } from "@/components/ui/Tag";
import { ProjectDiagram } from "@/components/work/diagrams";
import { CodeBlock } from "@/components/work/CodeBlock";

const statusLabel: Record<Project["status"], string> = {
  production: "In production",
  "open-source": "Open source",
  private: "Private",
};

function Part({
  index,
  title,
  children,
  className = "",
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line py-16 sm:py-20 ${className}`}>
      <Reveal className="mb-10 flex items-center gap-4">
        <span className="font-mono text-sm text-amber">{index}</span>
        <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line" />
      </Reveal>
      {children}
    </section>
  );
}

function MetricValue({ value }: { value: string }) {
  if (/^\d+$/.test(value)) {
    return <Counter value={parseInt(value, 10)} />;
  }
  return <>{value}</>;
}

export function CaseStudy({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="container-px pb-12 pt-28 sm:pt-32">
      {/* ── 00 · Executive hook ─────────────────────────── */}
      <header>
        <Reveal>
          <Link
            href="/#work"
            data-cursor
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-amber"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            All work
          </Link>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <span className="text-amber">{project.kind}</span>
          <span className="text-ghost">/</span>
          <span>{project.year}</span>
          <span className="text-ghost">/</span>
          <span>{project.role}</span>
          <span className="text-ghost">/</span>
          <span className="flex items-center gap-1.5">
            <span className={`inline-block h-1.5 w-1.5 ${project.status === "private" ? "bg-faint" : "bg-amber"}`} />
            {statusLabel[project.status]}
          </span>
        </Reveal>

        <ViewTransition name={`project-name-${project.slug}`}>
          <h1 className="mt-6 text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-fg">
            {project.name}
          </h1>
        </ViewTransition>

        <Reveal>
          <p className="mt-6 max-w-3xl text-balance text-xl leading-relaxed text-muted sm:text-2xl">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-6">
          <TagRow items={project.stack} />
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="inline-flex items-center gap-2 border border-line-bright px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fg transition-colors hover:border-amber hover:text-amber"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </Reveal>

        {/* metrics */}
        <Reveal stagger className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-base px-6 py-7">
              <div className="font-display text-3xl font-semibold text-amber sm:text-4xl">
                <MetricValue value={m.value} />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {m.label}
              </div>
            </div>
          ))}
        </Reveal>
      </header>

      {/* ── Architecture diagram (the bridge visual) ─────── */}
      <div className="mt-16">
        <Reveal>
          <ProjectDiagram kind={project.diagram} />
        </Reveal>
      </div>

      {/* ── 01 · Problem ─────────────────────────────────── */}
      <Part index="01" title="The problem">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-fg-soft">{project.problem.context}</p>
          </Reveal>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
              Constraints
            </div>
            <ul className="mt-5 space-y-4">
              {project.problem.scope.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-amber/70">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Part>

      {/* ── 02 · Architecture ────────────────────────────── */}
      <Part index="02" title="Architecture & system design">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-fg-soft">
            {project.architecture.intro}
          </p>
        </Reveal>

        {/* data flow */}
        <Reveal stagger className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {project.architecture.flow.map((f, i) => (
            <div key={f.step} className="group border-b border-r border-line bg-base p-6 transition-colors hover:bg-surface/50">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">{f.step}</h3>
                <span className="font-mono text-xs text-amber/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{f.detail}</p>
            </div>
          ))}
        </Reveal>

        {/* patterns */}
        <Reveal className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
          Resilience & patterns
        </Reveal>
        <Reveal stagger className="mt-6 space-y-px">
          {project.architecture.patterns.map((p) => (
            <div key={p.title} className="grid gap-3 border-l-2 border-amber/40 bg-surface/30 p-5 sm:grid-cols-[0.4fr_1fr] sm:gap-8">
              <h4 className="font-display text-base font-semibold text-fg">{p.title}</h4>
              <p className="text-sm leading-relaxed text-muted">{p.detail}</p>
            </div>
          ))}
        </Reveal>
      </Part>

      {/* ── 03 · Hardest challenge ───────────────────────── */}
      <Part index="03" title="The hardest technical challenge">
        <Reveal>
          <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-fg sm:text-3xl">
            {project.challenge.title}
          </h3>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <Reveal className="space-y-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                The hurdle
              </div>
              <p className="mt-3 leading-relaxed text-fg-soft">{project.challenge.hurdle}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                The approach
              </div>
              <p className="mt-3 leading-relaxed text-fg-soft">{project.challenge.approach}</p>
            </div>
          </Reveal>
          {project.challenge.code && (
            <Reveal>
              <CodeBlock snippet={project.challenge.code} />
            </Reveal>
          )}
        </div>
      </Part>

      {/* ── 04 · Interface (optional) ────────────────────── */}
      {project.ux && (
        <Part index="04" title="Interface & micro-interactions">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-fg-soft">{project.ux.intro}</p>
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {project.ux.points.map((pt) => (
              <div key={pt} className="bg-base p-6 text-sm leading-relaxed text-muted">
                {pt}
              </div>
            ))}
          </Reveal>
        </Part>
      )}

      {/* ── 05 · Retrospective ───────────────────────────── */}
      <Part index={project.ux ? "05" : "04"} title="Retrospective & roadmap">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
              What I learned
            </div>
            <p className="mt-4 text-lg leading-relaxed text-fg-soft">
              {project.postmortem.learned}
            </p>
          </Reveal>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Where it goes next
            </div>
            <ul className="mt-4 space-y-3">
              {project.postmortem.roadmap.map((r, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-muted">
                  <span className="flex h-[1lh] shrink-0 items-center">
                    <span className="h-px w-4 bg-amber/80" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Part>

      {/* ── Next project ─────────────────────────────────── */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor
        className="group mt-8 flex items-center justify-between border-t border-line py-12 transition-colors hover:bg-surface/40"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Next project
          </div>
          <div className="mt-2 text-3xl font-semibold text-fg transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
            {next.name}
          </div>
        </div>
        <span aria-hidden className="text-3xl text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-amber">
          →
        </span>
      </Link>
    </article>
  );
}
