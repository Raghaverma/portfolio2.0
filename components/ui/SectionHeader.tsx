import { Reveal } from "@/components/fx/Reveal";

/**
 * Industrial section header: a numbered index, a hairline rule, and a title.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  className = "",
}: {
  index: string;
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-end justify-between gap-6 ${className}`}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-amber">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>
      </div>
      {kicker ? (
        <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:block">
          {kicker}
        </span>
      ) : null}
    </Reveal>
  );
}
