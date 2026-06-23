# Raghav Verma — Portfolio (v3)

A high-signal, architecture-first engineering portfolio. **Industrial Precision**
aesthetic: deep matte-black surfaces, electric-amber accents, GSAP-driven
motion, and bespoke animated SVG architecture diagrams for each case study.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme inline` design tokens)
- **GSAP** + ScrollTrigger (reveals, draw-in diagrams) via `@gsap/react`
- `next/font` (Space Grotesk · Inter · JetBrains Mono, self-hosted)
- Fully static: every route prerenders to HTML (SSG) for near-instant loads.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes static)
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/                     routes, metadata, sitemap/robots, generated icon + OG
  page.tsx               home (hero → work → about → stack → contact)
  work/[slug]/page.tsx   case studies (SSG via generateStaticParams)
components/
  fx/                    Cursor, Magnetic, Reveal, TextReveal, Marquee, Counter, HeroCanvas
  layout/                Nav, Footer
  home/                  Hero, WorkIndex, About, Stack, Contact
  work/                  CaseStudy, CodeBlock, DiagramFrame, diagrams/*
content/                 typed data layer — site, projects, experience, skills
lib/gsap.ts              plugin registration
```

## Content

All copy lives in typed modules under `content/`. The case-study narrative
(`problem` / `architecture` / `challenge` / `postmortem`) lives in
`content/projects.ts`. Edit there — the pages render from data.

> Note: the contact form uses a `mailto:` flow and copy-to-clipboard (no backend
> secrets required). The résumé is served from `public/RaghavVerma_CV.pdf`.
