# Raghav Verma — portfolio

Source for [raghav-verma.com](https://raghav-verma.com): a one-page portfolio for a computer
vision engineer.

## Stack

Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Every route prerenders at
build time. The only client-side JavaScript of its own is the light/dark toggle in the nav:
light is the default, and a small inline script restores a saved dark choice before first
paint (`lib/theme.ts`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # content and colour tests; smoke tests run when BASE_URL is set
npm run build
```

Smoke tests need a running server:

```bash
npm run build && npx next start -p 3123      # terminal 1
BASE_URL=http://localhost:3123 npm test      # terminal 2
```

## Editing content

All copy lives in `content/`:

- `site.ts`: name, role, intro line, availability and links
- `projects.ts`: featured projects (summary, three highlights, stack, links, details) and
  other work
- `experience.ts`: roles and education

The pose skeleton in the intro is drawn from `lib/pose.ts`: COCO-17 keypoints for one bowling
delivery, animated with SVG's built-in SMIL (no JavaScript). `tests/pose.test.ts` keeps the
limbs from stretching between frames.

Colours are CSS variables at the top of `app/globals.css`: light by default, dark under
`:root[data-theme="dark"]`. `tests/theme.test.ts` keeps every text colour at WCAG AA in both
themes.

The résumé is served from `public/RaghavVerma_CV.pdf`.
