import type { CodeSnippet } from "@/content/projects";

/**
 * Lightweight code frame. No syntax-highlighting dependency — comment lines
 * are dimmed for readability, everything else stays in mono.
 */
export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const lines = snippet.code.split("\n");
  const isComment = (l: string) => {
    const t = l.trim();
    return t.startsWith("//") || t.startsWith("#");
  };

  return (
    <figure className="overflow-hidden border border-line bg-void">
      <figcaption className="flex items-center justify-between border-b border-line bg-surface/60 px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {snippet.label}
          </span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
          {snippet.lang}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[2ch_1fr] gap-4">
              <span className="select-none text-right text-faint/80">{i + 1}</span>
              <span className={isComment(line) ? "text-muted" : "text-fg-soft"}>
                {line || " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
