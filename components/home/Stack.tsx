import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";
import { Marquee } from "@/components/fx/Marquee";
import { skills, marqueeTokens } from "@/content/skills";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeader
          index="03"
          title="Stack & capabilities"
          kicker="What I build with"
          className="mb-14"
        />
      </div>

      <Marquee items={marqueeTokens} />

      <div className="container-px mt-14">
        <Reveal stagger className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.label}
              className="group border-b border-r border-line bg-base p-6 transition-colors duration-300 hover:bg-surface/60"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-fg">{group.label}</h3>
                <span className="font-mono text-xs text-amber/70 transition-colors group-hover:text-amber">
                  {group.index}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[13px] text-muted transition-colors group-hover:text-fg-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
