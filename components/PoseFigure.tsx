import {
  confidence,
  frames,
  hitRadius,
  hoverable,
  keyTimes,
  keypointNames,
  limbPath,
  viewBox,
} from "@/lib/pose";

const release = frames[frames.length - 1];

// Plays once after a short beat, then holds the release pose. The frames carry the
// easing (see lib/pose.ts), so each step between them is linear.
const timing = {
  begin: "0.4s",
  dur: "2.2s",
  fill: "freeze",
  keyTimes: keyTimes.join(";"),
} as const;

// Where a hovered joint's caption appears: under the figure, below the ground line.
const caption = { x: 4, y: 166 };

function Skeleton({ animated, className }: { animated: boolean; className: string }) {
  const start = animated ? frames[0] : release;
  return (
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      className={`overflow-visible text-accent ${className}`}
    >
      <line x1="10" y1="150" x2="114" y2="150" className="stroke-line" strokeWidth="1" />
      <path
        d={limbPath(start)}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        {animated && <animate attributeName="d" values={frames.map(limbPath).join(";")} {...timing} />}
      </path>
      {keypointNames.map((name, i) => {
        const [x, y] = start[i];
        const [rx, ry] = release[i];
        return (
          <g key={name} transform={`translate(${x} ${y})`} className="group">
            {animated && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values={frames.map((f) => `${f[i][0]} ${f[i][1]}`).join(";")}
                {...timing}
              />
            )}
            {/* A wider transparent target makes the joint easier to hover. */}
            {hoverable.includes(i) && <circle r={hitRadius} fill="transparent" />}
            <circle
              r="1.9"
              className="origin-center fill-current transition-transform duration-150 [transform-box:fill-box] group-hover:scale-[1.8]"
            />
            {/* Offset by the release position, so every caption lands in the same spot. */}
            <text
              x={caption.x - rx}
              y={caption.y - ry}
              fontSize="9"
              className="pointer-events-none invisible fill-muted font-mono opacity-0 transition-[opacity,visibility] duration-150 select-none group-hover:visible group-hover:opacity-100"
            >
              {name} {confidence[i].toFixed(2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * A COCO-17 pose skeleton bowling one delivery: a nod to the pose pipelines on this page.
 * Decorative, so hidden from screen readers. Hovering a joint shows its name and
 * confidence. Visitors who prefer reduced motion get the still release pose instead.
 */
export function PoseFigure({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" data-pose="bowling" className={className}>
      <Skeleton animated className="hidden motion-safe:block" />
      <Skeleton animated={false} className="block motion-safe:hidden" />
    </div>
  );
}
