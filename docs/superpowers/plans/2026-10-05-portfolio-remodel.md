# One-page CV Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the animated, multi-page portfolio with a calm one-page site that presents
Raghav as a computer vision engineer.

**Architecture:**
- Copy lives in typed modules under `content/`.
- Small server components under `components/` render that copy into one page:
  intro → work → other work → experience → contact.
- Colours are CSS variables that switch with the system's light/dark setting and are mapped
  into Tailwind v4.
- The old `/work/*` URLs redirect to anchors on the page.
- Tests use Node's built-in runner on plain `.ts` files:
  - unit tests for content and colour contrast
  - smoke tests over HTTP against a running server
  - a final pass in a real browser (Playwright MCP)

**Tech Stack:** Next.js 16.2 (App Router, Turbopack), React 19.2, TypeScript 5 (strict),
Tailwind CSS 4.3, `node:test` on Node 24.

**Spec:** `docs/superpowers/specs/2026-10-05-portfolio-remodel-design.md`. Read it first; its
**Copy** section is the source of truth for every string. (After the final review, six
claims were corrected and a light-default theme toggle was added; the spec has the current
version of both. This plan is kept as the record of what was planned.)

## Global Constraints

- **Stack:** stays Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. No new
  runtime dependencies. `gsap` and `@gsap/react` are removed.
- **Components:**
  - All components are server components; the page ships no JavaScript of its own.
  - Details uses the native `<details>` element.
- **Copy:** use the spec's Copy section word for word.
- **Colours:**
  - Tokens are `--bg`, `--surface`, `--fg`, `--muted`, `--line`, `--accent` and
    `--accent-hover`, with the exact light and dark hex values from the spec (light accent
    `#945b00`).
  - Every text colour must be at least 4.5:1 on both `--bg` and `--surface`, in both themes.
- **Layout:**
  - 680px content column with a 20px side gutter on phones.
  - Sticky nav, 52px high.
  - `scroll-margin-top` keeps anchored headings below the nav.
- **Type:**
  - Inter for everything; JetBrains Mono only for dates and stack lines.
  - Body 16px with line-height 1.65; name 28px (26px on phones); project names 19px;
    section titles 14px, medium weight, muted.
- **Motion:** 150ms colour transitions and the Details chevron rotation only, both off under
  `prefers-reduced-motion`.
- **AutoClip:** no repo link, no production URL, no internal volumes.
- **Redirects:** temporary (307). `/work/autoclip` → `/#autoclip`;
  `/work/meridian|forge|phalanx` → `/#other-work`.
- **Build:** every route prerenders as static.
- **Lockfile:** after removing GSAP, there are no `gsap` or `@gsap/react` entries and all 10
  `linux-x64` platform entries are kept.
- **Test servers:** smoke and browser tests run on port **3123**. Port 3000 belongs to the dev
  server in `.claude/launch.json`.
- **Commits:** every commit message ends with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never commit `.omc/`.

## Review Focus

1. **A phone visitor opens a Details panel that has a table.** The page must not scroll
   sideways at 375px. Pinned in Task 6, Step 4.
2. **A visitor uses dark mode.** Every component must take its colours from the theme
   tokens, and the browser's theme colour must match `--bg`. Pinned in Task 2, Step 1
   (`tests/theme.test.ts` additions).
3. **Someone opens an old shared `/work/<slug>` link.** It must land on the matching section,
   with the heading visible below the sticky nav. The fragment survives the redirect: Task 2,
   Step 1 (smoke). The heading clears the nav: Task 6, Step 6.
4. **A keyboard-only visitor.** They must be able to reach every Details toggle, see where
   focus is, and open and close it with Enter or Space. Pinned in Task 6, Step 5.
5. **A visitor without JavaScript, or before hydration.** All project details must already
   be in the server HTML. Pinned in Task 4, Step 1 (smoke).

## How to run the test server (used by several tasks)

All commands run from the repo root in Git Bash, except the stop command, which is PowerShell.

```bash
# start (Bash tool with run_in_background: true)
npx next start -p 3123        # or: npx next dev -p 3123
# wait until it answers
curl -s -o /dev/null --retry 60 --retry-connrefused --retry-delay 1 http://localhost:3123/
# run every test, including smoke tests
BASE_URL=http://localhost:3123 npm test
```

```powershell
# stop (PowerShell tool)
Get-NetTCPConnection -LocalPort 3123 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## File map

| File | Task | Responsibility |
|---|---|---|
| `package.json`, `tsconfig.json` | 1, 2 | `test` script, `.ts` imports in tests, GSAP removal |
| `app/globals.css` | 1 | Colour tokens, Tailwind theme mapping, base styles, `.link` |
| `tests/theme.test.ts` | 1, 2, 5 | Contrast, token parity, theme-colour sync, tokens-only markup |
| `content/site.ts` | 2 | Name, role, intro, availability, location, email, links, nav |
| `components/TextLink.tsx` | 2 | `<a>` that opens web pages and the PDF in a new tab |
| `components/Nav.tsx` | 2 | Sticky top bar |
| `components/Intro.tsx` | 2 | First section (`#top`) |
| `components/Section.tsx` | 2 | `<section id>` with a small title |
| `components/Footer.tsx` | 2 | Contact (`#contact`) and copyright |
| `app/layout.tsx`, `app/page.tsx` | 2, 4 | Shell; page composition |
| `next.config.ts`, `app/sitemap.ts` | 2 | Redirects; home-only sitemap |
| `tests/site.test.ts`, `tests/smoke.test.ts` | 2, 4 | Site content; HTTP smoke tests |
| `content/projects.ts`, `content/experience.ts` | 3 | Project and experience copy and types; `dateRange` |
| `tests/content.test.ts` | 3 | Content invariants |
| `components/ProjectEntry.tsx`, `OtherWork.tsx`, `Experience.tsx` | 4 | Page body |
| `app/icon.tsx`, `app/opengraph-image.tsx`, `app/not-found.tsx`, `README.md` | 5 | Assets, 404 page and docs |

`TextLink.tsx` is one file beyond the spec's list. It keeps the open-in-new-tab rule in one
place instead of four.

---

### Task 1: Test runner, colour tokens and contrast test

**Files:**
- Modify: `package.json` (scripts)
- Modify: `tsconfig.json` (`compilerOptions`)
- Create: `tests/theme.test.ts`
- Rewrite: `app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces, for every later task:
  - `npm test`, which runs `node --test "tests/**/*.test.ts"`.
  - CSS variables `--bg --surface --fg --muted --line --accent --accent-hover`.
  - Tailwind utilities `bg-bg bg-surface text-fg text-muted border-line divide-line
    bg-accent text-accent hover:text-accent-hover max-w-page font-sans font-mono`.
  - The `.link` class.
  - `tests/theme.test.ts` defines the module-level `themes` (light and dark token maps).
    Later tasks append tests to this same file and use it.

Once `globals.css` is replaced, the old components lose most of their styling until Task 2
deletes them. That is expected; the build still passes.

- [ ] **Step 1: Add the test script and allow `.ts` imports in tests**

In `package.json`, add a `test` script, so `"scripts"` reads:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "node --test \"tests/**/*.test.ts\""
  },
```

In `tsconfig.json`, add `"allowImportingTsExtensions": true` directly after `"noEmit": true,`:

```json
    "noEmit": true,
    "allowImportingTsExtensions": true,
```

Node runs the tests by stripping types. The extension flag lets `next build`'s type check
accept `import … from "../content/site.ts"`, and it is allowed because `noEmit` is on.

- [ ] **Step 2: Write the failing contrast test**

Create `tests/theme.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Hex-valued custom properties (`--name: #rrggbb;`) in a slice of CSS.
function tokens(css: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [, name, value] of css.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})\s*;/gi)) {
    out[name] = value.toLowerCase();
  }
  return out;
}

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const darkAt = css.indexOf("@media (prefers-color-scheme: dark)");
const themes = {
  light: tokens(css.slice(0, Math.max(darkAt, 0))),
  dark: tokens(darkAt >= 0 ? css.slice(darkAt) : ""),
};

test("globals.css has a dark theme block", () => {
  assert.ok(darkAt > 0, "missing @media (prefers-color-scheme: dark)");
});

test("both themes define exactly the seven colour tokens", () => {
  const expected = ["accent", "accent-hover", "bg", "fg", "line", "muted", "surface"];
  assert.deepEqual(Object.keys(themes.light).sort(), expected);
  assert.deepEqual(Object.keys(themes.dark).sort(), expected);
});

for (const [theme, t] of Object.entries(themes)) {
  for (const text of ["fg", "muted", "accent", "accent-hover"]) {
    for (const background of ["bg", "surface"]) {
      test(`${theme}: --${text} on --${background} is at least 4.5:1`, () => {
        const ratio = contrast(t[text] ?? "#000000", t[background] ?? "#000000");
        assert.ok(ratio >= 4.5, `${ratio.toFixed(2)}:1`);
      });
    }
  }
  test(`${theme}: selected text (--bg on --accent) is at least 4.5:1`, () => {
    const ratio = contrast(t.bg ?? "#000000", t.accent ?? "#000000");
    assert.ok(ratio >= 4.5, `${ratio.toFixed(2)}:1`);
  });
}
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test`
Expected: FAIL. "globals.css has a dark theme block" and the token-set test fail, because the
old `globals.css` has neither a dark block nor these token names.

- [ ] **Step 4: Replace `app/globals.css`**

```css
@import "tailwindcss";

/* Colour tokens. Light is the default; dark follows the visitor's system setting.
   tests/theme.test.ts holds every text colour to WCAG AA on --bg and --surface. */
:root {
  color-scheme: light dark;
  --bg: #f7f5f1;
  --surface: #efece5;
  --fg: #1c1a16;
  --muted: #5f5a51;
  --line: #e3dfd6;
  --accent: #945b00;
  --accent-hover: #7e4d00;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #151412;
    --surface: #1d1c19;
    --fg: #ebe7df;
    --muted: #a39d92;
    --line: #2c2a26;
    --accent: #e0a64b;
    --accent-hover: #f0bd6a;
  }
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, "SF Mono", monospace;

  /* 680px reading column + 20px gutters */
  --container-page: 45rem;
}

@layer base {
  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: var(--accent);
    color: var(--bg);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  /* Inline link: accent colour with a soft underline that firms up on hover. */
  .link {
    color: var(--accent);
    text-decoration-line: underline;
    text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
    text-underline-offset: 3px;
    transition:
      color 150ms,
      text-decoration-color 150ms;
  }

  .link:hover {
    color: var(--accent-hover);
    text-decoration-color: currentColor;
  }
}
```

- [ ] **Step 5: Run the tests and watch them pass**

Run: `npm test`
Expected: PASS. 20 tests: the two structure tests, plus 9 contrast tests per theme. The
lowest ratio is light `--accent` on `--surface` at about 4.74.

- [ ] **Step 6: Check that the app still builds**

Run: `npm run build`
Expected: the build succeeds. The type check accepts the `.ts`-extension setting.

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json app/globals.css tests/theme.test.ts
git commit -F - <<'EOF'
feat: light/dark colour tokens with a WCAG contrast test

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 2: Remove the old site and build the page shell

**Files:**
- Delete: `components/fx/`, `components/home/`, `components/work/`, `components/ui/`,
  `components/layout/`, `app/work/`, `app/api/`, `lib/gsap.ts`, `content/skills.ts`
- Rewrite: `content/site.ts`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`,
  `app/sitemap.ts`
- Create: `components/TextLink.tsx`, `components/Nav.tsx`, `components/Intro.tsx`,
  `components/Section.tsx`, `components/Footer.tsx`
- Create: `tests/site.test.ts`, `tests/smoke.test.ts`
- Modify: `tests/theme.test.ts` (append), `package.json` and `package-lock.json` (through
  `npm uninstall`)

**Interfaces:**
- Consumes: Task 1's tokens and utilities, `.link`, `npm test`.
- Produces:
  - `content/site.ts`:
    - `site` (fields `name title role intro description availability location url email
      keywords`, plus `links: { github, linkedin, resume }`)
    - `nav: readonly { label: string; href: string }[]`
  - `TextLink(props: ComponentProps<"a"> & { href: string })`
  - `Section({ id, title, children }: { id: string; title: string; children: ReactNode })`
  - `Nav()`, `Intro()`, `Footer()`
  - `tests/smoke.test.ts` defines the module-level `live` (skip options) and
    `page(path): Promise<string>`. Task 4 appends tests to this same file and uses both.
- `content/projects.ts` and `content/experience.ts` stay as they are. Nothing imports them
  after this task, and Task 3 rewrites them.

- [ ] **Step 1: Write the failing tests**

Create `tests/site.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { site, nav } from "../content/site.ts";

test("intro states the role, employer and availability", () => {
  assert.equal(site.role, "Computer vision engineer at Khel.AI");
  assert.equal(site.availability, "Open to CV / ML roles");
  assert.equal(
    site.intro,
    "I build the pose-estimation and video pipelines behind Khel.AI's cricket analysis, and make them faster without letting accuracy slip.",
  );
});

test("nav links point at the home page's section anchors", () => {
  assert.deepEqual(
    nav.map((item) => item.href),
    ["/#work", "/#experience", "/#contact"],
  );
});

test("profile links are https and the résumé file exists", () => {
  assert.match(site.links.github, /^https:\/\//);
  assert.match(site.links.linkedin, /^https:\/\//);
  assert.ok(
    existsSync(new URL(`../public${site.links.resume}`, import.meta.url)),
    site.links.resume,
  );
});
```

Create `tests/smoke.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";

// Runs against a live server: BASE_URL=http://localhost:3123 npm test
const base = process.env.BASE_URL;
const live = {
  skip: base ? false : "set BASE_URL to run smoke tests against a server",
};

async function page(path: string): Promise<string> {
  const res = await fetch(new URL(path, base));
  assert.equal(res.status, 200, `${path} returned ${res.status}`);
  return res.text();
}

test("home page has the intro, nav and contact footer", live, async () => {
  const html = await page("/");
  assert.match(html, /<h1[^>]*>Raghav Verma<\/h1>/);
  // Match the rendered elements, not the meta description, which repeats this copy.
  assert.match(html, /<p[^>]*>Computer vision engineer at Khel\.AI<\/p>/);
  assert.match(html, /<span>Open to CV \/ ML roles<\/span>/);
  assert.match(html, /href="\/#work"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /href="mailto:raghav\.verma\.work@gmail\.com"/);
});

test("removed features are gone", live, async () => {
  const html = await page("/");
  assert.doesNotMatch(html, /spotify/i);
  assert.doesNotMatch(html, /data-cursor/);
  const api = await fetch(new URL("/api/spotify", base));
  assert.equal(api.status, 404);
});

const redirects: [string, string][] = [
  ["/work/autoclip", "/#autoclip"],
  ["/work/meridian", "/#other-work"],
  ["/work/forge", "/#other-work"],
  ["/work/phalanx", "/#other-work"],
];

for (const [from, to] of redirects) {
  test(`${from} redirects to ${to}`, live, async () => {
    const res = await fetch(new URL(from, base), { redirect: "manual" });
    assert.equal(res.status, 307);
    const location = new URL(res.headers.get("location") ?? "", base);
    assert.equal(location.pathname + location.hash, to);
  });
}

test("unknown pages are a 404", live, async () => {
  const res = await fetch(new URL("/work/unknown", base));
  assert.equal(res.status, 404);
});
```

In `tests/theme.test.ts`, change the import line
`import { readFileSync } from "node:fs";` to:

```ts
import { readFileSync, readdirSync } from "node:fs";
```

Then append these tests at the end of the file. They cover Review Focus 2.

```ts
test("the browser theme colours in app/layout.tsx match --bg", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const light = layout.match(/prefers-color-scheme: light\)", color: "(#[0-9a-f]{6})"/i)?.[1];
  const dark = layout.match(/prefers-color-scheme: dark\)", color: "(#[0-9a-f]{6})"/i)?.[1];
  assert.equal(light?.toLowerCase(), themes.light.bg);
  assert.equal(dark?.toLowerCase(), themes.dark.bg);
});

// Page markup must take its colours from the tokens, or dark mode breaks.
// app/icon.tsx and app/opengraph-image.tsx render images and are exempt.
const markupFiles = [
  ...readdirSync(new URL("../components/", import.meta.url))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => `components/${file}`),
  "app/page.tsx",
];

for (const file of markupFiles) {
  test(`${file} uses theme tokens, not literal colours`, () => {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b/i, "hex colour");
    assert.doesNotMatch(
      source,
      /\b(?:text|bg|border|divide|fill|stroke|ring|outline|decoration)-(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d{2,3})?\b/,
      "Tailwind palette colour",
    );
  });
}
```

- [ ] **Step 2: Run the tests against the current site and watch them fail**

Start the dev server on 3123 (see "How to run the test server"), then run:
`BASE_URL=http://localhost:3123 npm test`

Expected failures:
- `tests/site.test.ts`: `site.role` is undefined.
- smoke: no "Computer vision engineer at Khel.AI".
- smoke: the Spotify markup and `/api/spotify` still exist.
- smoke: the `/work/*` pages return 200 instead of 307.
- theme: the layout theme colour doesn't match.
- theme: the old components use `text-amber` and similar.

Stop the server.

- [ ] **Step 3: Delete the old UI, routes and GSAP**

```bash
git rm -r -q components/fx components/home components/work components/ui components/layout app/work app/api lib/gsap.ts content/skills.ts
npm uninstall gsap @gsap/react --no-audit --no-fund
grep -c '"node_modules/gsap"\|"node_modules/@gsap/react"' package-lock.json   # expect 0
grep -o '"node_modules/[^"]*linux-x64[^"]*"' package-lock.json | sort -u | wc -l   # expect 10
```

If either count is wrong, stop and report: Linux deploys depend on it. Expect the lockfile
diff to also show npm 11 bookkeeping (`"peer": true` flags, removed `@emnapi/core` and
`@emnapi/runtime`). That's fine; see the spec's Risks section.

- [ ] **Step 4: Rewrite `content/site.ts`**

```ts
export const site = {
  name: "Raghav Verma",
  title: "Raghav Verma — Computer Vision Engineer",
  role: "Computer vision engineer at Khel.AI",
  intro:
    "I build the pose-estimation and video pipelines behind Khel.AI's cricket analysis, and make them faster without letting accuracy slip.",
  description:
    "Computer vision engineer at Khel.AI. I build pose-estimation and video pipelines for cricket analysis, and make them faster without letting accuracy slip.",
  availability: "Open to CV / ML roles",
  location: "New Delhi, India",
  url: "https://raghav-verma.com",
  email: "raghav.verma.work@gmail.com",
  links: {
    github: "https://github.com/Raghaverma",
    linkedin: "https://www.linkedin.com/in/raghaverma/",
    resume: "/RaghavVerma_CV.pdf",
  },
  keywords: [
    "Raghav Verma",
    "Computer Vision Engineer",
    "Pose estimation",
    "ViTPose",
    "TensorRT",
    "Inference optimization",
    "Cricket analytics",
    "Khel.AI",
  ],
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;
```

- [ ] **Step 5: Create `components/TextLink.tsx`**

```tsx
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & { href: string };

// Web pages and the résumé PDF open in a new tab; mailto and in-page links stay put.
export function TextLink({ href, children, ...rest }: Props) {
  const newTab = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 6: Create `components/Nav.tsx`**

The name uses `next/link`, because a literal `<a href="/…">` trips
`@next/next/no-html-link-for-pages`. The section links are plain anchors with `href`s from
data, so the browser handles the jump with no JavaScript.

```tsx
import Link from "next/link";
import { nav, site } from "@/content/site";
import { TextLink } from "@/components/TextLink";

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <nav aria-label="Main" className="mx-auto flex h-13 max-w-page items-center gap-4 px-5">
        <Link
          href="/"
          className="hidden font-medium text-fg transition-colors hover:text-accent min-[480px]:block"
        >
          {site.name}
        </Link>
        <ul className="ml-auto flex items-center gap-4 text-sm text-muted sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-fg">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <TextLink href={site.links.resume} className="transition-colors hover:text-fg">
              Résumé
            </TextLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 7: Create `components/Section.tsx`**

```tsx
import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-14 scroll-mt-18 sm:mt-18">
      <h2 id={`${id}-title`} className="text-sm font-medium text-muted">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
```

- [ ] **Step 8: Create `components/Intro.tsx`**

```tsx
import { site } from "@/content/site";
import { TextLink } from "@/components/TextLink";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Résumé", href: site.links.resume },
];

export function Intro() {
  return (
    <section id="top" aria-label="Introduction" className="scroll-mt-18 pt-14 sm:pt-20">
      <h1 className="text-[26px] font-semibold leading-tight text-fg sm:text-[28px]">
        {site.name}
      </h1>
      <p className="mt-1 text-fg">{site.role}</p>
      <p className="mt-4 text-pretty text-fg">{site.intro}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        <span>{site.availability}</span>
        <span aria-hidden>·</span>
        <span>{site.location}</span>
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <TextLink href={link.href} className="link">
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 9: Create `components/Footer.tsx`**

```tsx
import { site } from "@/content/site";
import { TextLink } from "@/components/TextLink";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Résumé", href: site.links.resume },
];

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="mt-14 scroll-mt-18 border-t border-line sm:mt-18"
    >
      <div className="mx-auto max-w-page px-5 py-12">
        <h2 id="contact-title" className="text-sm font-medium text-muted">
          Contact
        </h2>
        <p className="mt-4 text-fg">The quickest way to reach me is email.</p>
        <p className="mt-1">
          <TextLink
            href={`mailto:${site.email}`}
            className="text-lg text-accent transition-colors hover:text-accent-hover"
          >
            {site.email}
          </TextLink>
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <TextLink
                href={link.href}
                className="text-accent transition-colors hover:text-accent-hover"
              >
                {link.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[13px] text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 10: Rewrite `app/layout.tsx`**

The two `themeColor` entries must stay in exactly this shape; `tests/theme.test.ts` reads them.

```tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen">
        <Nav />
        <main className="mx-auto max-w-page px-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 11: Rewrite `app/page.tsx` (shell only; Task 4 adds the sections)**

```tsx
import { Intro } from "@/components/Intro";

export default function Home() {
  return <Intro />;
}
```

- [ ] **Step 12: Rewrite `next.config.ts`**

```ts
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree (multiple lockfiles exist above it).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // The old case-study pages are now sections of the home page. Temporary (307),
  // so project pages can come back later without stale browser caches.
  async redirects() {
    return [
      { source: "/work/autoclip", destination: "/#autoclip", permanent: false },
      {
        source: "/work/:slug(meridian|forge|phalanx)",
        destination: "/#other-work",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 13: Rewrite `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 14: Lint, build, and run the unit tests**

Run: `npm run lint && npm run build && npm test`
Expected:
- lint is clean
- the build lists `/`, `/_not-found`, `/icon`, `/opengraph-image`, `/robots.txt` and
  `/sitemap.xml`, all static (○)
- unit tests pass and the smoke tests show as skipped

`app/opengraph-image.tsx` still renders the old slogan; Task 5 replaces it.

- [ ] **Step 15: Run the smoke tests against the production build**

Start `npx next start -p 3123`, wait, then run `BASE_URL=http://localhost:3123 npm test`.
Expected: PASS, including all four redirects.

If the redirect assertions fail only because the `#fragment` is missing from `Location`,
change both destinations to `"/"` and the expected values in the test to `"/"`, as the spec's
fallback allows. Then note this in the task report. Stop the server.

- [ ] **Step 16: Commit**

```bash
# lib/ deletions were staged by `git rm` in Step 3; naming the missing dir here would error.
git add -A components content app next.config.ts package.json package-lock.json tests
git status --short   # .omc/ must not be staged
git commit -F - <<'EOF'
feat: one-page shell; remove effects, case studies and Spotify

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 3: Project and experience content

**Files:**
- Rewrite: `content/projects.ts`, `content/experience.ts`
- Create: `tests/content.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces, for Task 4:
  - `content/projects.ts` exports these types and data:
    - `type LinkItem = { label: string; href: string }`
    - `type Highlight = { figure?: string; text: string }`
    - `type Table = { caption: string; columns: string[]; rows: string[][] }`
    - `type FeaturedProject = { slug; name; tag; live?; summary; highlights: [Highlight,
      Highlight, Highlight]; stack: string[]; links: LinkItem[]; details: { bullets:
      string[]; table?: Table } }`
    - `type OtherProject = { name; summary; links: LinkItem[]; note? }`
    - `featured: FeaturedProject[]` and `otherWork: OtherProject[]`
  - `content/experience.ts` exports:
    - `type Role = { company; title; start; end; summary }`
    - `type Education = { degree; school; start; end }`
    - `roles: Role[]` and `education: Education[]`
    - `dateRange(start: string, end: string): string`

- [ ] **Step 1: Write the failing content tests**

Create `tests/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { featured, otherWork } from "../content/projects.ts";
import { roles, education, dateRange } from "../content/experience.ts";

const allCopy = JSON.stringify({ featured, otherWork, roles, education });

test("the three CV projects are featured, in order", () => {
  assert.deepEqual(
    featured.map((p) => p.slug),
    ["autoclip", "vitpose-bench", "cricketfm"],
  );
});

test("each featured project has a summary, three highlights, a stack and 3–5 detail bullets", () => {
  for (const p of featured) {
    assert.ok(p.summary.trim(), `${p.slug}: empty summary`);
    assert.equal(p.highlights.length, 3, p.slug);
    for (const h of p.highlights) assert.ok(h.text.trim(), `${p.slug}: empty highlight`);
    assert.ok(p.stack.length >= 3, `${p.slug}: stack`);
    const n = p.details.bullets.length;
    assert.ok(n >= 3 && n <= 5, `${p.slug}: ${n} detail bullets`);
  }
});

test("slugs are unique and safe to use as anchors", () => {
  const slugs = featured.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z][a-z0-9-]*$/);
});

test("results tables are rectangular", () => {
  for (const p of featured) {
    const table = p.details.table;
    if (!table) continue;
    for (const row of table.rows) {
      assert.equal(row.length, table.columns.length, `${p.slug}: ${row[0]}`);
    }
  }
});

test("AutoClip is live and links nowhere (private repo, login-only production URL)", () => {
  const autoclip = featured.find((p) => p.slug === "autoclip");
  assert.equal(autoclip?.live, true);
  assert.deepEqual(autoclip?.links, []);
});

test("project links only go to public hosts, and the copy names no IP addresses", () => {
  const hosts = [...featured, ...otherWork].flatMap((p) => p.links.map((l) => new URL(l.href).host));
  for (const host of hosts) assert.ok(["github.com", "www.npmjs.com"].includes(host), host);
  assert.doesNotMatch(allCopy, /\b\d{1,3}(?:\.\d{1,3}){3}\b/);
});

test("every project link is https, and the public repos are linked", () => {
  const hrefs = [...featured, ...otherWork].flatMap((p) => p.links.map((l) => l.href));
  for (const href of hrefs) assert.match(href, /^https:\/\//);
  for (const repo of ["vitpose-inference-bench", "CricketFM", "Meridianjs"]) {
    assert.ok(hrefs.includes(`https://github.com/Raghaverma/${repo}`), repo);
  }
});

test("other work is Meridian, Forge and Phalanx, each with links or a note", () => {
  assert.deepEqual(
    otherWork.map((p) => p.name),
    ["Meridian", "Forge", "Phalanx"],
  );
  for (const p of otherWork) assert.ok(p.links.length > 0 || p.note, p.name);
});

test("roles are newest first, starting with the current CV role", () => {
  assert.equal(roles[0]?.title, "Computer Vision Engineer");
  assert.equal(roles[0]?.end, "Present");
  assert.deepEqual(
    roles.map((r) => r.company),
    ["Khel.AI", "Khel.AI", "Hypeliv Solutions", "The TechnoLabs"],
  );
  assert.equal(education.length, 2);
});

test("date ranges drop a repeated year", () => {
  assert.equal(dateRange("Feb 2026", "May 2026"), "Feb – May 2026");
  assert.equal(dateRange("Aug 2025", "Jan 2026"), "Aug 2025 – Jan 2026");
  assert.equal(dateRange("May 2026", "Present"), "May 2026 – Present");
  assert.equal(dateRange("2024", "2026"), "2024 – 2026");
});

test("copy has no placeholders or doubled spaces", () => {
  assert.doesNotMatch(allCopy, /TODO|TBD|lorem|\s{2,}/i);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test`
Expected: FAIL. `featured`, `otherWork`, `roles` and `dateRange` are not exported by the old
modules.

- [ ] **Step 3: Rewrite `content/projects.ts`**

All copy here is word for word from the spec's Copy section. The spec's link type `Link` is
named `LinkItem` here, so it doesn't clash with `next/link`'s `Link` in components.

```ts
export type LinkItem = { label: string; href: string };

/** Rendered as "figure text", with the figure in bold ink. */
export type Highlight = { figure?: string; text: string };

export type Table = { caption: string; columns: string[]; rows: string[][] };

export type FeaturedProject = {
  /** Anchor id on the home page. */
  slug: string;
  name: string;
  tag: string;
  /** Shows the amber "live" dot before the tag. */
  live?: boolean;
  summary: string;
  highlights: [Highlight, Highlight, Highlight];
  stack: string[];
  links: LinkItem[];
  details: { bullets: string[]; table?: Table };
};

export type OtherProject = {
  name: string;
  summary: string;
  links: LinkItem[];
  /** Shown instead of links, e.g. "Private". */
  note?: string;
};

export const featured: FeaturedProject[] = [
  {
    slug: "autoclip",
    name: "AutoClip",
    tag: "Khel.AI · In production",
    live: true,
    summary:
      "Turns raw cricket video into one clip per delivery or shot, with ball speed and biomechanics metrics attached. Deployed on NVIDIA T4 and L4 GPU servers.",
    highlights: [
      {
        text: "Bowler and batter modes share one ViTPose++ pose backbone, migrated from YOLO11-pose.",
      },
      {
        text: "Measures ball speed, run-up speed, stride length and elbow and knee angles for bowlers, and bat speed and weight transfer for batters.",
      },
      {
        text: "Sends doubtful ball tracks to a reviewer instead of reporting a confident, wrong speed.",
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "ViTPose++",
      "YOLO",
      "ByteTrack",
      "OpenCV",
      "FFmpeg",
      "TensorRT",
      "Flask",
    ],
    links: [],
    details: {
      bullets: [
        "YOLO finds people, ByteTrack keeps their IDs, and a scoring tracker locks onto the bowler or batter. ViTPose++ then runs on batched, upscaled crops.",
        "A state machine over the pose sequence marks run-up, release and follow-through (or the bat swing). Each trigger becomes one clip, cut losslessly with FFmpeg stream copy.",
        "Ball tracking links detections into competing tracks and keeps the longest, smoothest one. A track that wanders or barely moves goes to a reviewer, not into a speed.",
        "Reviewers work in a Flask app with Google sign-in, and a manual ball mark always overrides the automatic number. Bowler clips can also get a Gemini-written biomechanics review.",
        "Jobs stream in from Khel.AI's backend and run one at a time per GPU, with config overlays per GPU (T4, L4, A4000, A5000). YOLO detectors load from TensorRT engines when they exist.",
      ],
    },
  },
  {
    slug: "vitpose-bench",
    name: "ViTPose++ inference bench",
    tag: "Open source",
    summary:
      "How far can ViTPose++-L inference go on one NVIDIA L4 without moving the poses? Compares PyTorch, ONNX Runtime and TensorRT (FP16 and INT8), from the bare model to a full video pipeline. Every speedup must pass an accuracy gate first.",
    highlights: [
      {
        figure: "4.08×",
        text: "faster pose model at batch 1: TensorRT FP16 runs in 5.07 ms.",
      },
      {
        figure: "2.9×",
        text: "throughput from an asynchronous, multi-stream video pipeline (68.0 frames/s), with the same poses.",
      },
      {
        figure: "0.809",
        text: "COCO keypoint AP for TensorRT FP16, identical to PyTorch.",
      },
    ],
    stack: ["PyTorch", "ONNX Runtime", "TensorRT", "Triton", "CUDA", "YOLOv8", "pycocotools"],
    links: [
      { label: "GitHub", href: "https://github.com/Raghaverma/vitpose-inference-bench" },
    ],
    details: {
      bullets: [
        "Every stage is gated against a golden reference, on both raw-tensor error and decoded keypoint distance, before any latency counts.",
        "The first INT8 engine was broken, with 72 px keypoint error. Quantizing only the MatMul inputs, calibrated on real footage split by video, fixed it: 1.74× over FP16 at batch 16.",
        "Profiling showed the bottleneck was Hugging Face's CPU crop warp (43% of a frame), not the model. A Triton kernel reproduces it bit for bit on the GPU and halves CPU use.",
        "The GPU is shared with production, so a contention guard discards and re-runs any chunk that overlapped another job.",
        "Found a float32 indexing bug in Hugging Face's pose decode that misdecodes calls with 300 or more boxes.",
      ],
      table: {
        caption: "From model to fleet",
        columns: ["Step", "Result"],
        rows: [
          ["Pose model alone, batch 1", "5.07 ms, 4.08× PyTorch"],
          ["Synchronous video pipeline", "23.5 frames/s"],
          ["Asynchronous pipeline", "68.0 frames/s"],
          ["All 82 job videos, all FP16", "97.8 frames/s, +11% over the production config"],
        ],
      },
    },
  },
  {
    slug: "cricketfm",
    name: "CricketFM",
    tag: "In progress · Open source",
    summary:
      "Do foundation models beat specialist vision systems at cricket? Sapiens against ViTPose++ for pose, and a 4B vision-language model, zero-shot against LoRA, for shot recognition. The protocol was frozen before any result existed.",
    highlights: [
      {
        figure: "0.809 vs 0.667",
        text: "COCO AP: ViTPose++-L leads Sapiens-0.3B in the baseline check. A fair head-to-head waits on Sapiens' COCO-17 head.",
      },
      {
        figure: "4.4–21×",
        text: "the throughput of Sapiens on an L4, at about 1/21 of the energy per image.",
      },
      {
        text: "Every pose model must pass a COCO accuracy gate before it touches cricket footage, which catches wrong crops and scrambled keypoint maps.",
      },
    ],
    stack: [
      "PyTorch",
      "Transformers",
      "Sapiens",
      "ViTPose++",
      "Qwen3.5-4B",
      "LoRA",
      "pycocotools",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raghaverma/CricketFM" }],
    details: {
      bullets: [
        "Status: protocol v1.0 frozen, pose adapters pass the COCO gate, latency measured. Next: 800 labelled frames for the pose benchmark, and shot labels for the VLM pilot.",
        "Sapiens doesn't batch on the L4: a single 1024×768 crop already holds the card at its 72 W power cap.",
        "Footage comes from 118 AutoClip job videos. Re-uploads are caught by content fingerprint and kept in one split. Footage stays private; only aggregates are committed.",
        "Shot recognition runs as a pilot: about 19 minutes of batting from 10 batters gives on the order of 100 shots.",
      ],
      table: {
        caption: "Baseline on an L4",
        columns: ["", "ViTPose++-L", "Sapiens-0.3B"],
        rows: [
          ["COCO AP", "0.809", "0.667"],
          ["Images/s, batch 16", "222", "10.4"],
          ["Energy per image", "0.32 J", "6.88 J"],
          ["End to end, one person", "27.6 ms", "90.8 ms"],
        ],
      },
    },
  },
];

export const otherWork: OtherProject[] = [
  {
    name: "Meridian",
    summary:
      "TypeScript SDK that gives 46 third-party APIs one typed interface for errors, rate limits, retries and failover, with zero required runtime dependencies.",
    links: [
      { label: "GitHub", href: "https://github.com/Raghaverma/Meridianjs" },
      { label: "npm", href: "https://www.npmjs.com/package/meridianjs" },
    ],
  },
  {
    name: "Forge",
    summary:
      "Runtime for AI operators that act on real business tools only through approval gates, with an append-only audit log.",
    links: [],
    note: "Private",
  },
  {
    name: "Phalanx",
    summary:
      "Security platform that merges findings from many scanners and triages them with deterministic rules, scoring exploitability by reachability.",
    links: [],
    note: "Private",
  },
];
```

- [ ] **Step 4: Rewrite `content/experience.ts`**

```ts
export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  summary: string;
};

export type Education = {
  degree: string;
  school: string;
  start: string;
  end: string;
};

/** "Feb 2026" + "May 2026" → "Feb – May 2026"; otherwise "start – end". */
export function dateRange(start: string, end: string): string {
  const [startMonth, startYear] = start.split(" ");
  const [, endYear] = end.split(" ");
  return startYear && startYear === endYear ? `${startMonth} – ${end}` : `${start} – ${end}`;
}

// Newest first.
export const roles: Role[] = [
  {
    company: "Khel.AI",
    title: "Computer Vision Engineer",
    start: "May 2026",
    end: "Present",
    summary: "Own AutoClip end to end, from model choice and detection logic to GPU deployment.",
  },
  {
    company: "Khel.AI",
    title: "SDE Intern",
    start: "Feb 2026",
    end: "May 2026",
    summary:
      "Built the first AutoClip: broadcast ingestion, YOLOv8 delivery detection, FFmpeg clipping and React review tools.",
  },
  {
    company: "Hypeliv Solutions",
    title: "Frontend Engineer (Contract)",
    start: "Aug 2025",
    end: "Jan 2026",
    summary: "Real-time trading UI on WebSocket market data; cut LCP from 2.5 s to 1.5 s.",
  },
  {
    company: "The TechnoLabs",
    title: "Frontend Engineer Intern",
    start: "Jan 2024",
    end: "Jul 2024",
    summary: "React invoicing app with PDF export; Python scripts to validate OCR datasets.",
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications",
    school: "Vivekananda Institute of Professional Studies (GGSIPU)",
    start: "2024",
    end: "2026",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "Bennett University",
    start: "2021",
    end: "2024",
  },
];
```

- [ ] **Step 5: Run the tests and watch them pass**

Run: `npm test`
Expected: PASS. All content tests pass, earlier unit tests still pass, and smoke tests are
skipped.

- [ ] **Step 6: Check that the app still builds**

Run: `npm run lint && npm run build`
Expected: clean. Nothing renders these modules yet.

- [ ] **Step 7: Commit**

```bash
git add content/projects.ts content/experience.ts tests/content.test.ts
git commit -F - <<'EOF'
feat: CV-first project and experience content with invariant tests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 4: Work, Other work and Experience sections

**Files:**
- Create: `components/ProjectEntry.tsx`, `components/OtherWork.tsx`,
  `components/Experience.tsx`
- Rewrite: `app/page.tsx`
- Modify: `tests/smoke.test.ts` (append)

**Interfaces:**
- Consumes:
  - Task 2: `Section`, `TextLink`, `live`, `page()`
  - Task 3: `featured`, `otherWork`, `FeaturedProject`, `Table`, `roles`, `education`,
    `dateRange`
- Produces:
  - `ProjectEntry({ project }: { project: FeaturedProject })`, rendering
    `<article id={slug}>` with exactly one `<details>`
  - `OtherWork()`
  - `Experience()`
  - the final `app/page.tsx`

- [ ] **Step 1: Append the failing smoke tests**

Append to `tests/smoke.test.ts`:

```ts
test("every section and project anchor is on the page", live, async () => {
  const html = await page("/");
  for (const id of ["top", "work", "autoclip", "vitpose-bench", "cricketfm", "other-work", "experience", "contact"]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }
});

test("each featured project has one Details element, already in the server HTML", live, async () => {
  const html = await page("/");
  assert.equal(html.match(/<details/g)?.length, 3);
  // Review Focus 5: details content must not depend on JavaScript.
  assert.match(html, /contention guard/);
  assert.match(html, /From model to fleet/);
  assert.match(html, /Baseline on an L4/);
});

test("AutoClip links nowhere", live, async () => {
  const html = await page("/");
  const start = html.indexOf('id="autoclip"');
  const end = html.indexOf('id="vitpose-bench"');
  assert.ok(start > 0 && end > start, "AutoClip block not found");
  assert.doesNotMatch(html.slice(start, end), /href=/);
});

test("public repos and npm are linked", live, async () => {
  const html = await page("/");
  for (const href of [
    "https://github.com/Raghaverma/vitpose-inference-bench",
    "https://github.com/Raghaverma/CricketFM",
    "https://github.com/Raghaverma/Meridianjs",
    "https://www.npmjs.com/package/meridianjs",
  ]) {
    assert.ok(html.includes(`href="${href}"`), href);
  }
});

test("experience lists the current role first", live, async () => {
  const html = await page("/");
  // Search inside the section: <title> also contains "Computer Vision Engineer".
  const section = html.slice(html.indexOf('id="experience"'));
  const cv = section.indexOf("Computer Vision Engineer");
  const intern = section.indexOf("SDE Intern");
  assert.ok(cv >= 0 && intern > cv);
  assert.match(section, /Feb – May 2026/);
});
```

- [ ] **Step 2: Run them and watch them fail**

Build, start on 3123, run `BASE_URL=http://localhost:3123 npm test`, and stop the server.
Expected: the five new smoke tests FAIL, because the page has only the intro. Everything else
passes.

- [ ] **Step 3: Create `components/ProjectEntry.tsx`**

```tsx
import type { FeaturedProject, Table } from "@/content/projects";
import { TextLink } from "@/components/TextLink";

function ResultsTable({ table }: { table: Table }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm tabular-nums">
        <caption className="mb-2 text-left font-medium text-fg">{table.caption}</caption>
        <thead>
          <tr>
            {table.columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-line py-2 pr-4 font-medium text-muted"
              >
                {column || <span className="sr-only">Measure</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th
                    key={i}
                    scope="row"
                    className="border-b border-line py-2 pr-4 font-normal text-fg"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="border-b border-line py-2 pr-4 text-fg">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProjectEntry({ project }: { project: FeaturedProject }) {
  const titleId = `${project.slug}-title`;
  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      className="scroll-mt-18 py-10 first:pt-0 last:pb-0"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={titleId} className="text-[19px] font-semibold text-fg">
          {project.name}
        </h3>
        <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
          <span className="flex items-center gap-2">
            {project.live && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
            {project.tag}
          </span>
          {project.links.map((link) => (
            <TextLink key={link.href} href={link.href} className="link">
              {link.label}
              <span aria-hidden> ↗</span>
            </TextLink>
          ))}
        </p>
      </header>

      <p className="mt-2 text-pretty text-fg">{project.summary}</p>

      <ul className="mt-4 space-y-2 text-[15px] text-muted">
        {project.highlights.map((highlight) => (
          <li key={highlight.text} className="flex gap-3">
            <span aria-hidden className="flex h-[1lh] shrink-0 items-center">
              <span className="h-px w-3 bg-muted/50" />
            </span>
            <span>
              {highlight.figure && (
                <>
                  <strong className="font-semibold tabular-nums text-fg">{highlight.figure}</strong>{" "}
                </>
              )}
              {highlight.text}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-mono text-[13px] leading-relaxed text-muted">
        {project.stack.join(" · ")}
      </p>

      <details className="group mt-4">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-150 group-open:rotate-90"
          >
            <path
              d="M6 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Details
        </summary>
        <div className="mt-3 rounded-md bg-surface p-4 sm:p-5">
          <ul className="list-disc space-y-2 pl-4 text-[15px] text-muted marker:text-muted/60">
            {project.details.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          {project.details.table && <ResultsTable table={project.details.table} />}
        </div>
      </details>
    </article>
  );
}
```

- [ ] **Step 4: Create `components/OtherWork.tsx`**

```tsx
import { otherWork } from "@/content/projects";
import { TextLink } from "@/components/TextLink";

export function OtherWork() {
  return (
    <ul className="space-y-5">
      {otherWork.map((project) => (
        <li key={project.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold text-fg">{project.name}</h3>
            <p className="flex gap-3 text-sm text-muted">
              {project.links.length > 0
                ? project.links.map((link) => (
                    <TextLink key={link.href} href={link.href} className="link">
                      {link.label}
                      <span aria-hidden> ↗</span>
                    </TextLink>
                  ))
                : project.note}
            </p>
          </div>
          <p className="mt-1 text-pretty text-[15px] text-muted">{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Create `components/Experience.tsx`**

```tsx
import { roles, education, dateRange } from "@/content/experience";

export function Experience() {
  return (
    <>
      <ol className="space-y-6">
        {roles.map((role) => (
          <li key={`${role.company}-${role.start}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <h3 className="font-semibold text-fg">
                {role.title} <span className="font-normal text-muted">· {role.company}</span>
              </h3>
              <p className="font-mono text-[13px] text-muted">{dateRange(role.start, role.end)}</p>
            </div>
            <p className="mt-1 text-pretty text-[15px] text-muted">{role.summary}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-10 text-sm font-medium text-muted">Education</h3>
      <ul className="mt-4 space-y-3">
        {education.map((item) => (
          <li
            key={item.degree}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
          >
            <p className="text-[15px] text-fg">
              {item.degree} <span className="text-muted">· {item.school}</span>
            </p>
            <p className="font-mono text-[13px] text-muted">{dateRange(item.start, item.end)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
```

- [ ] **Step 6: Rewrite `app/page.tsx`**

```tsx
import { Intro } from "@/components/Intro";
import { Section } from "@/components/Section";
import { ProjectEntry } from "@/components/ProjectEntry";
import { OtherWork } from "@/components/OtherWork";
import { Experience } from "@/components/Experience";
import { featured } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Intro />
      <Section id="work" title="Work">
        <div className="divide-y divide-line">
          {featured.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <Section id="other-work" title="Other work">
        <OtherWork />
      </Section>
      <Section id="experience" title="Experience">
        <Experience />
      </Section>
    </>
  );
}
```

- [ ] **Step 7: Lint, build and run every test**

Run: `npm run lint && npm run build`, start on 3123, run
`BASE_URL=http://localhost:3123 npm test`, and stop the server.
Expected:
- lint and build are clean, with all routes static
- every unit and smoke test passes, including the theme tests for the new components

- [ ] **Step 8: Commit**

```bash
git add components app/page.tsx tests/smoke.test.ts
git commit -F - <<'EOF'
feat: work, other work and experience sections with native details

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 5: Icon, social image, 404 page and README

**Files:**
- Rewrite: `app/icon.tsx`, `app/opengraph-image.tsx`, `app/not-found.tsx`, `README.md`
- Modify: `tests/theme.test.ts` (add `app/not-found.tsx` to `markupFiles`)

**Interfaces:**
- Consumes: `site` from Task 2.
- Produces: nothing for later tasks.

- [ ] **Step 1: Make the 404 page part of the tokens-only test**

In `tests/theme.test.ts`, change the `markupFiles` list so its last entries read:

```ts
  "app/page.tsx",
  "app/not-found.tsx",
];
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test`
Expected: FAIL on "app/not-found.tsx uses theme tokens", because the old page uses
`text-amber`, `bg-amber` and similar.

- [ ] **Step 3: Rewrite `app/not-found.tsx`**

```tsx
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
```

- [ ] **Step 4: Rewrite `app/icon.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f5f1",
          color: "#1c1a16",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-1px",
          borderRadius: 12,
          border: "4px solid #945b00",
        }}
      >
        RV
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 5: Rewrite `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f1",
          color: "#1c1a16",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5f5a51" }}>raghav-verma.com</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 44, color: "#945b00" }}>
            {site.role}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5f5a51" }}>
          {`${site.availability} · ${site.location}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 6: Rewrite `README.md`**

````markdown
# Raghav Verma — portfolio

Source for [raghav-verma.com](https://raghav-verma.com): a one-page portfolio for a computer
vision engineer.

## Stack

Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Every route prerenders at
build time, and the page ships no client-side JavaScript of its own.

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

Colours are CSS variables at the top of `app/globals.css`. `tests/theme.test.ts` keeps every
text colour at WCAG AA in both light and dark mode.

The résumé is served from `public/RaghavVerma_CV.pdf`.
````

- [ ] **Step 7: Lint, build, test**

Run: `npm run lint && npm run build && npm test`
Expected: all clean, and the 404 tokens test passes.

Then start on 3123 and open these in a browser (Playwright MCP is fine):
- `http://localhost:3123/opengraph-image`: shows the name, the role in amber, and the
  availability and location line.
- `http://localhost:3123/icon`: shows "RV" in an amber frame.

Stop the server.

- [ ] **Step 8: Commit**

```bash
git add app/icon.tsx app/opengraph-image.tsx app/not-found.tsx README.md tests/theme.test.ts
git commit -F - <<'EOF'
feat: restyled icon, social image and 404 page; README for the new site

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 6: Browser verification

This task checks layout, keyboard and theme behaviour in a real browser, using the Playwright
MCP tools (`browser_navigate`, `browser_resize`, `browser_evaluate`, `browser_click`,
`browser_press_key`, `browser_emulate_media`, `browser_take_screenshot` and
`browser_console_messages`).

Fix any failure in the component that owns it, re-run `npm test`, and commit the fix with a
`fix:` message before moving on.

**Files:** whatever a failed check points to. Screenshots go to the scratchpad, not the repo.

**Interfaces:** consumes the finished site; produces nothing.

- [ ] **Step 1: Fresh production build, then start the server**

Run `npm run build`, start `npx next start -p 3123`, and wait until it answers.

- [ ] **Step 2: Full test suite against the live server**

Run: `BASE_URL=http://localhost:3123 npm test`
Expected: everything passes.

- [ ] **Step 3: Phone, light theme: no sideways scroll**

Navigate to `http://localhost:3123/`, resize to 375×812, and evaluate:

```js
() => ({
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  details: document.querySelectorAll("details").length,
  navLinksVisible: [...document.querySelectorAll("header li a")].every((a) => a.getBoundingClientRect().width > 0),
})
```

Expected: `{ overflow: false, details: 3, navLinksVisible: true }`. Take a full-page
screenshot.

- [ ] **Step 4: Phone: opening every Details keeps the page from scrolling sideways (Review Focus 1)**

Evaluate:

```js
() => {
  document.querySelectorAll("details").forEach((d) => (d.open = true));
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
}
```

Expected: `false`. Take a full-page screenshot with everything expanded and check that both
tables are readable at 375px.

- [ ] **Step 5: Keyboard toggles Details with a visible focus ring (Review Focus 4)**

1. Click the "Details" summary under ViTPose++ inference bench, then evaluate
   `() => document.querySelector("#vitpose-bench details").open`. Expected: `true`. Click it
   again; expected `false`.
2. Reload the page, then evaluate
   `() => document.querySelector("#autoclip summary").focus()`.
3. Press `Enter`, then evaluate
   `() => document.querySelector("#autoclip details").open`. Expected: `true`.
4. Press `Space`, then evaluate it again. Expected: `false`.
5. Evaluate `() => getComputedStyle(document.activeElement).outlineStyle`.
   Expected: `"solid"`.
6. Press `Tab` from the top of the page until every summary has been reached. It should take
   fewer than about 20 presses, and none of the summaries is skipped.

(The first step tests mouse clicks. The keyboard steps start from a reload so the earlier
clicks don't leave a panel open.)

- [ ] **Step 6: Anchors and old links land below the sticky nav (Review Focus 3)**

1. Click the nav's "Experience" link, then evaluate
   `() => document.getElementById("experience-title").getBoundingClientRect().top`.
   Expected: a value between 52 and 120.
2. Navigate to `http://localhost:3123/work/autoclip`, then evaluate
   `() => [location.pathname + location.hash, Math.round(document.getElementById("autoclip-title").getBoundingClientRect().top)]`.
   Expected: `["/#autoclip", n]` with `n` between 52 and 120.

- [ ] **Step 7: Dark theme on phone and desktop**

Emulate `colorScheme: "dark"` and reload. Evaluate:

```js
() => getComputedStyle(document.body).backgroundColor
```

Expected: `"rgb(21, 20, 18)"`, which is `#151412`.

Take full-page screenshots at 375×812 and 1280×800. Look for any text that is hard to read,
any element still showing a light background, and the amber dot and links.

- [ ] **Step 8: Desktop, light theme**

Emulate `colorScheme: "light"`, resize to 1280×800, and take a full-page screenshot. Check:
- the column is centred and about 680px wide
- tags and links sit right-aligned on the project header row
- spacing between sections is visibly larger than between projects

- [ ] **Step 9: No console errors**

Check `browser_console_messages` at level `error`. Expected: none, ignoring favicon 404s if
any appear.

- [ ] **Step 10: Stop the server and report**

Stop the server. Report each step's result and the screenshot paths. If any `fix:` commits
were made, list them.
