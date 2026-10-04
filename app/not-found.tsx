import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-20">
      <p className="font-mono text-[13px] text-muted">404</p>
      <h1 className="mt-2 text-[26px] font-semibold leading-tight text-fg">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4">
        <Link href="/" className="link">
          Back to the home page
        </Link>
      </p>
    </section>
  );
}
