import Link from "next/link";
import { Magnetic } from "@/components/fx/Magnetic";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center gap-3 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-amber-ink hover:bg-amber-bright",
  ghost:
    "border border-line-bright text-fg hover:border-amber hover:text-amber",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  magnetic = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  magnetic?: boolean;
}) {
  const inner = (
    <Link
      href={href}
      data-cursor
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );

  return magnetic ? <Magnetic strength={0.4}>{inner}</Magnetic> : inner;
}
