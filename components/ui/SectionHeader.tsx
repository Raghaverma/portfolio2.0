import { Reveal } from "@/components/fx/Reveal";

export function SectionHeader({
  index,
  href,
  kicker,
  title,
  className = "",
}: {
  index: string;
  href: string;
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-end justify-between gap-6 ${className}`}>
      <div className="flex items-baseline gap-4">
        <a
          href={href}
          className="font-mono text-sm text-amber transition-opacity hover:opacity-70"
        >
          {index}
        </a>
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
