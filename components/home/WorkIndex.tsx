import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";

const statusLabel: Record<Project["status"], string> = {
  production: "In production",
  "open-source": "Open source",
  private: "Private",
};

function ProjectRow({ project, n }: { project: Project; n: number }) {
  const index = String(n + 1).padStart(2, "0");
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor
      className="group relative block border-t border-line transition-colors duration-500 last:border-b hover:bg-surface/40"
    >
      {/* amber edge that grows on hover */}
      <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-amber transition-transform duration-500 group-hover:scale-y-100" />

      <div className="grid grid-cols-12 items-center gap-4 px-4 py-7 sm:px-8 sm:py-9">
        {/* index */}
        <div className="col-span-2 font-mono text-xs text-amber sm:col-span-1">
          {index}
        </div>

        {/* name + kind */}
        <div className="col-span-10 sm:col-span-5">
          <h3 className="text-3xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {project.kind}
          </p>
        </div>

        {/* summary */}
        <p className="col-span-12 text-pretty text-sm leading-relaxed text-muted sm:col-span-4 sm:text-[13px]">
          {project.summary}
        </p>

        {/* meta + arrow */}
        <div className="col-span-12 flex items-center justify-between sm:col-span-2 sm:flex-col sm:items-end sm:gap-3">
          <div className="text-right">
            <div className="font-mono text-xs text-fg-soft">{project.year}</div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              <span
                className={`inline-block h-1.5 w-1.5 ${
                  project.status === "private" ? "bg-faint" : "bg-amber"
                }`}
              />
              {statusLabel[project.status]}
            </div>
          </div>
          <span
            aria-hidden
            className="text-2xl text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-amber"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkIndex() {
  return (
    <section id="work" className="container-px scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="01"
        href="/#work"
        title="Selected work"
        kicker={`${projects.length} case studies`}
        className="mb-12"
      />
      <Reveal>
        <div className="border-line">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} n={i} />
          ))}
        </div>
      </Reveal>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ghost">
        Each entry breaks down the problem, architecture, and the hardest
        technical decision.
      </p>
    </section>
  );
}
