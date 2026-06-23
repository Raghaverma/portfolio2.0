import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-px flex min-h-[80svh] flex-col items-center justify-center text-center">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-30" />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
        Error · 404
      </span>
      <h1 className="mt-6 text-[clamp(3rem,14vw,9rem)] font-semibold leading-none tracking-tight text-fg">
        Lost signal
      </h1>
      <p className="mt-6 max-w-md text-muted">
        This route doesn&apos;t resolve. The page may have moved, or never
        existed.
      </p>
      <Link
        href="/"
        data-cursor
        className="mt-10 inline-flex items-center gap-3 bg-amber px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-amber-ink transition-colors hover:bg-amber-bright"
      >
        ← Back home
      </Link>
    </main>
  );
}
