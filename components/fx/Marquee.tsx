"use client";

import { Fragment } from "react";

/**
 * Seamless CSS marquee. Content is duplicated and translated -50%,
 * so the loop is continuous. Pauses on hover.
 */
export function Marquee({
  items,
  speed = 38,
}: {
  items: string[];
  speed?: number;
}) {
  return (
    <div className="group relative flex overflow-hidden border-y border-line bg-surface/40 py-5">
      <div
        className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.18em] text-faint"
              >
                {item}
                <span className="text-amber/70">/</span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
