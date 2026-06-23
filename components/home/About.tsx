import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";
import { experience, education } from "@/content/experience";
import { site } from "@/content/site";

function ExperienceItem({
  role,
}: {
  role: (typeof experience)[number];
}) {
  return (
    <div className="relative pl-8">
      {/* timeline rail node */}
      <span
        className={`absolute left-0 top-2 z-10 h-3 w-3 -translate-x-[5.5px] rounded-full border-2 ${
          role.current
            ? "border-amber bg-amber"
            : "border-line-bright bg-base"
        }`}
      />
      {role.current && (
        <span className="absolute left-0 top-2 h-3 w-3 -translate-x-[5.5px] animate-ping rounded-full bg-amber/50" />
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold text-fg">
          {role.title}{" "}
          <span className="text-amber">· {role.company}</span>
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          {role.start} — {role.end}
        </span>
      </div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        {role.summary}
      </p>
      <ul className="mt-4 space-y-2">
        {role.highlights.map((h, k) => (
          <li
            key={k}
            className="flex gap-3 text-[13px] leading-relaxed text-fg-soft"
          >
            <span className="flex h-[1lh] shrink-0 items-center">
              <span className="h-px w-3 bg-amber/80" />
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
        {role.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-t border-line bg-surface/30 py-24 sm:py-32"
    >
      <div className="container-px">
        <SectionHeader index="02" title="About" kicker="Profile · Experience" className="mb-14" />

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left — narrative + education */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                I&apos;m a software engineer who likes the hard, unglamorous
                parts of a system — the ingestion edge that can&apos;t drop a
                frame, the triage path that has to be deterministic, the
                resilience layer that decides whether an outage cascades.
              </p>
              <p>
                Right now I&apos;m at{" "}
                <span className="text-fg">Khel.AI</span>, building a real-time
                computer-vision pipeline that turns live cricket broadcast into
                clipped deliveries. Before that I shipped performance-critical
                Next.js frontends and a fair bit of open source.
              </p>
            </div>

            {/* identity card */}
            <div className="mt-10 border border-line bg-base p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                Education
              </div>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.degree} className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-fg">{e.degree}</span>
                    <span className="text-xs text-muted">{e.school}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {e.start} — {e.end}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                {site.location} · {site.timezone}
              </div>
            </div>
          </Reveal>

          {/* Right — experience timeline */}
          <Reveal stagger className="relative">
            <div className="absolute bottom-2 left-0 top-2 w-px bg-line" />
            <div className="space-y-14">
              {experience.map((role) => (
                <ExperienceItem key={role.company} role={role} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
