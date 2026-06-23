export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-surface/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-soft transition-colors hover:border-line-bright hover:text-amber">
      {children}
    </span>
  );
}

export function TagRow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}
