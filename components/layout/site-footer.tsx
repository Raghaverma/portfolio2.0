import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full py-12 px-8 bg-[#f3f4f1] mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
        <div className="font-headline italic text-lg text-[#655d59]">
          Raghav Verma
        </div>

        <div className="flex gap-8">
          <Link
            href="https://github.com/Raghaverma"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-wider uppercase text-[#655d59] hover:text-[#944a32] underline-offset-4 hover:underline transition-all"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/raghaverma/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-wider uppercase text-[#655d59] hover:text-[#944a32] underline-offset-4 hover:underline transition-all"
          >
            LinkedIn
          </Link>
          <Link
            href="https://open.spotify.com/user/31pgsy5xe3cbxvvf3r7hxtluvy74"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-wider uppercase text-[#655d59] hover:text-[#944a32] underline-offset-4 hover:underline transition-all"
          >
            Spotify
          </Link>
        </div>

        <div className="font-sans text-xs tracking-wider uppercase text-[#655d59]">
          © {new Date().getFullYear()} Crafted with intentionality.
        </div>
      </div>
    </footer>
  )
}
