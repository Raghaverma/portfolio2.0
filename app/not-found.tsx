import Link from "next/link"
import { Navigation } from "@/components/layout/navigation"
import { SiteFooter } from "@/components/layout/site-footer"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#655d59] mb-6">
          Error 404
        </p>

        <h1 className="font-headline text-[120px] md:text-[200px] font-light leading-none text-[#e0e3e0] select-none">
          404
        </h1>

        <div className="-mt-8 md:-mt-16 relative z-10">
          <h2 className="font-headline text-4xl md:text-6xl text-[#2f3331] mb-4">
            Page not{" "}
            <span className="serif-italic text-[#944a32]">found.</span>
          </h2>
          <p className="text-[#5c605d] max-w-sm mx-auto mb-12 leading-relaxed">
            The page you&apos;re looking for has been moved, deleted, or never
            existed in the first place.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2f3331] text-[#faf7f6] px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#944a32] transition-all duration-300 group"
          >
            Back to Home
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
