# Portfolio remodel: design

**Date:** 2026-10-05 · **Branch:** `redesign/cv-one-page` · **Status:** awaiting review

## Goal

Rebuild raghav-verma.com as a calm, single-page portfolio that presents Raghav as a
computer vision engineer. A reader should know who Raghav is, what Raghav has built and how
to get in touch within a minute, on a phone or a laptop.

## Audience and success criteria

**Readers:** recruiters, hiring managers and engineers hiring for computer vision and
ML-inference roles. They skim, often on a phone.

The remodel succeeds when:

- The first screen states the role, the employer and the focus.
- Each featured project makes sense from its summary and three highlights alone, without
  opening anything.
- Every section is one tap away from the nav.
- No motion or decoration competes with the text. The one animation, the pose figure, plays
  once and stops.
- Every claim traces to a source: a repo README, AutoClip's docs, or the current site and CV.

## Decisions

| Topic | Decision |
|---|---|
| Positioning | CV-first. Three featured CV projects; Meridian, Forge and Phalanx shrink to one line each. |
| Structure | One page. Each featured project has a native, collapsed **Details** section. The `/work/*` case-study pages are removed and redirect to the matching anchor. |
| Visual | The current warm off-white, ink and amber palette, toned down. Light is the default for every visitor; a sun/moon toggle in the nav switches to dark and remembers the choice. (Changed during the build at Raghav's request; the first version followed the system setting with no toggle.) |
| Availability | An "Open to CV / ML roles" line in the intro. |
| Signature touch | Added at Raghav's request ("get creative"): a COCO-17 pose skeleton beside the intro, in thin amber lines. It plays one bowling delivery (run-up, gather, landing, release) once, then holds the release pose; hovering a joint shows its name and an illustrative confidence. Inline SVG with SMIL, no JavaScript; reduced motion gets the still release pose. Data in `lib/pose.ts`. |
| AutoClip disclosure | What it does, how it works at a high level, and its stack. No repo link (the repo is private), no production URL (it needs a login), no internal volumes. |
| Removed | Spotify card and `/api/spotify`, custom cursor, film grain, hero canvas, marquee, text and scroll reveals, magnetic buttons, counters, view transitions, skills grid, GSAP. |

## Page structure

```
Nav (sticky)   Raghav Verma                       Work · Experience · Contact · Résumé

#top           Intro
#work          Work
                 #autoclip       AutoClip
                 #vitpose-bench  ViTPose++ inference bench
                 #cricketfm      CricketFM
#other-work    Other work
#experience    Experience, then Education
#contact       Contact (footer)
```

## Copy

This is the text that ships. Numbers come from the sources named under each project.

### Metadata

- **Title:** Raghav Verma — Computer Vision Engineer
- **Description:** Computer vision engineer at Khel.AI. I build pose-estimation and video
  pipelines for cricket analysis, and make them faster without letting accuracy slip.

### Intro

- **Name:** Raghav Verma
- **Role:** Computer vision engineer at Khel.AI
- **Line:** I build the pose-estimation and video pipelines behind Khel.AI's cricket
  analysis, and make them faster without letting accuracy slip.
- **Availability:** Open to CV / ML roles (with a small amber dot)
- **Location:** New Delhi, India
- **Links:** GitHub · LinkedIn · Email · Résumé

### Work

#### AutoClip

*Source: AutoClip's private repo and its docs. Nothing links to it.*

- **Tag:** Khel.AI · In production
- **Summary:** Turns raw cricket video into one clip per delivery or shot, with ball speed and
  biomechanics metrics attached. Deployed on NVIDIA T4 and L4 GPU servers.
- **Highlights:**
  1. Bowler and batter modes share one ViTPose++ pose backbone, migrated from YOLO11-pose.
  2. Measures ball speed, run-up speed, stride length and elbow and knee angles for bowlers,
     and bat speed and weight transfer for batters.
  3. Sends doubtful ball tracks to a reviewer instead of reporting a confident, wrong speed.
- **Stack:** Python · PyTorch · ViTPose++ · YOLO · ByteTrack · OpenCV · FFmpeg · TensorRT · Flask
- **Details:**
  - For bowlers, YOLO finds people, ByteTrack keeps their IDs and a scoring tracker locks
    onto the bowler; ViTPose++ then runs on batched, upscaled crops. For batters, the
    person whose wrist is nearest the detected bat is the batter, with a size-and-position
    fallback when the bat isn't found.
  - A state machine over the pose sequence marks run-up, release and follow-through (or the
    bat swing). Each trigger becomes one clip, cut with FFmpeg and re-encoded to H.264/AAC
    so any browser can play it.
  - Ball tracking links detections into competing tracks and keeps the longest, smoothest
    one. A track that wanders or barely moves goes to a reviewer, not into a speed.
  - Reviewers work in a Flask app with Google sign-in, and a manual ball mark always
    overrides the automatic number. Bowler clips can also get a Gemini-written
    biomechanics review.
  - Jobs stream in from Khel.AI's backend and run one at a time per GPU, with config
    overlays per GPU (T4, L4, A4000, A5000). YOLO detectors load from TensorRT engines
    when they exist.
- **Links:** none.

#### ViTPose++ inference bench

*Source: `github.com/Raghaverma/vitpose-inference-bench` README.*

- **Tag:** Open source
- **Summary:** How far can ViTPose++-L inference go on one NVIDIA L4 without moving the
  poses? Compares PyTorch, ONNX Runtime and TensorRT (FP16 and INT8), from the bare model
  to a full video pipeline. Every speedup must pass an accuracy gate first.
- **Highlights:**
  1. **4.08×** faster pose model at batch 1: TensorRT FP16 runs in 5.07 ms.
  2. **2.9×** throughput from an asynchronous, multi-stream video pipeline (68.0 frames/s),
     with the same poses.
  3. **0.809** COCO keypoint AP for TensorRT FP16, identical to PyTorch.
- **Stack:** PyTorch · ONNX Runtime · TensorRT · Triton · CUDA · YOLOv8 · pycocotools
- **Details:**
  - Every backend is gated against a golden reference on raw-tensor error and decoded
    keypoint distance, and every pipeline change against the poses it replaces, before
    any latency counts.
  - The first INT8 engine was broken, with 72 px keypoint error. Quantizing only the MatMul
    inputs, calibrated on real footage split by video, fixed it: 1.74× over FP16 at batch 16.
  - Profiling showed the bottleneck was Hugging Face's CPU crop warp (43% of a frame), not
    the model. A Triton kernel reproduces it bit for bit on the GPU; with a GPU pose
    decode, CPU use halves.
  - The GPU is shared with production, so a contention guard discards and re-runs any chunk
    that overlapped another job.
  - Found a float32 indexing bug in Hugging Face's pose decode that misdecodes calls with
    300 or more boxes.
  - **Table: from model to fleet**

    | Step | Result |
    |---|---|
    | Pose model alone, batch 1 | 5.07 ms, 4.08× PyTorch |
    | Synchronous video pipeline | 23.5 frames/s |
    | Asynchronous pipeline | 68.0 frames/s |
    | All 82 job videos, all FP16 (55 projected) | 97.8 frames/s, +11% over the production config |
- **Links:** GitHub → `https://github.com/Raghaverma/vitpose-inference-bench`

#### CricketFM

*Source: `github.com/Raghaverma/CricketFM` README.*

- **Tag:** In progress · Open source
- **Summary:** Do foundation models beat specialist vision systems at cricket? Sapiens
  against ViTPose++ for pose, and a 4B vision-language model, zero-shot against LoRA, for
  shot recognition. The protocol was frozen before any cricket label or result existed.
- **Highlights:**
  1. **0.809 vs 0.667** COCO AP: ViTPose++-L leads Sapiens-0.3B in the baseline check. A
     fair head-to-head waits on Sapiens' COCO-17 head.
  2. **4.4–21×** the throughput of Sapiens on an L4, at about 1/21 of the energy per image.
  3. Every pose model must pass a COCO accuracy gate before it touches cricket footage,
     which catches wrong crops and scrambled keypoint maps.
- **Stack:** PyTorch · Transformers · Sapiens · ViTPose++ · Qwen3.5-4B · LoRA · pycocotools
- **Details:**
  - Status: protocol v1.0 frozen, pose adapters pass the COCO gate, latency measured.
    Next: 800 labelled frames for the pose benchmark, and shot labels for the VLM pilot.
  - Sapiens doesn't batch on the L4: a single 1024×768 crop already holds the card at its
    72 W power cap.
  - Footage comes from 118 AutoClip job videos. Re-uploads are caught by content
    fingerprint and kept in one split. Footage stays private; only aggregates are committed.
  - Shot recognition runs as a pilot: about 19 minutes of batting from 10 batters should
    give on the order of 100 shots.
  - **Table: baseline on an L4**

    | | ViTPose++-L | Sapiens-0.3B |
    |---|---|---|
    | COCO AP | 0.809 | 0.667 |
    | Images/s, batch 16 | 222 | 10.4 |
    | Energy per image | 0.32 J | 6.88 J |
    | End to end, one person | 27.6 ms | 90.8 ms |
- **Links:** GitHub → `https://github.com/Raghaverma/CricketFM`

### Other work

- **Meridian:** TypeScript SDK that gives 46 third-party APIs one typed interface for
  errors, rate limits, retries and failover, with zero required runtime dependencies.
  Links: GitHub (`https://github.com/Raghaverma/Meridianjs`), npm
  (`https://www.npmjs.com/package/meridianjs`).
- **Forge:** Runtime for AI operators that act on real business tools only through approval
  gates, with an append-only audit log. Private.
- **Phalanx:** Security platform that merges findings from many scanners and triages them
  with deterministic rules, scoring exploitability by reachability. Private.

### Experience

| Company | Title | Dates | Line |
|---|---|---|---|
| Khel.AI | Computer Vision Engineer | May 2026 – Present | Own AutoClip end to end, from model choice and detection logic to GPU deployment. |
| Khel.AI | SDE Intern | Feb – May 2026 | Built the first AutoClip: broadcast ingestion, YOLOv8 delivery detection, FFmpeg clipping and React review tools. |
| Hypeliv Solutions | Frontend Engineer (Contract) | Aug 2025 – Jan 2026 | Real-time trading UI on WebSocket market data; cut LCP from 2.5 s to 1.5 s. |
| The TechnoLabs | Frontend Engineer Intern | Jan – Jul 2024 | React invoicing app with PDF export; Python scripts to validate OCR datasets. |

**Education**

- Master of Computer Applications, Vivekananda Institute of Professional Studies (GGSIPU),
  2024 – 2026
- Bachelor of Computer Applications, Bennett University, 2021 – 2024

### Contact

- "The quickest way to reach me is email." `raghav.verma.work@gmail.com`
- GitHub · LinkedIn · Résumé
- © 2026 Raghav Verma (the year is computed at build time)

## Visual design

### Tokens

CSS variables on `:root`, with dark values under `:root[data-theme="dark"]`, set by the nav
toggle and restored before first paint by an inline `<head>` script (`lib/theme.ts`).
Every text colour must reach WCAG AA (4.5:1) on both `--bg` and `--surface`, checked by
script. The light accent is a slightly darker amber than today's `#9a5e00`, which measures
4.48:1 on `--surface`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f7f5f1` | `#151412` | Page |
| `--surface` | `#efece5` | `#1d1c19` | Open Details panel, table header |
| `--fg` | `#1c1a16` | `#ebe7df` | Headings, key figures, body |
| `--muted` | `#5f5a51` | `#a39d92` | Secondary text, section titles, stack |
| `--line` | `#e3dfd6` | `#2c2a26` | Hairlines |
| `--accent` | `#945b00` | `#e0a64b` | Links, hover, "live" dot, focus ring |
| `--accent-hover` | `#7e4d00` | `#f0bd6a` | Link hover |

### Type and layout

- **Fonts:** Inter for everything, and JetBrains Mono only for dates and stack lines. Both
  come from `next/font`. Space Grotesk is dropped.
- **Sizes:**
  - Body: 16px, line-height 1.65.
  - Name: 28px semibold (26px on phones).
  - Project names: 19px semibold.
  - Section titles: 14px medium, muted, normal case.
  - Stack lines: 13px mono, muted.
- **Figures:** `tabular-nums`. In a highlight, the key figure is `--fg` semibold and the
  rest is `--muted`.
- **Column:** max-width 680px, centred, with a 20px side gutter on phones.
- **Spacing:** 72px between sections (56px on phones), 40px between projects, with a
  hairline between projects.

### Components

- **Nav:** sticky, 52px high, solid `--bg`, hairline bottom border. Links are 14px `--muted`
  and turn `--fg` on hover. Below 480px the name is hidden and only the links show, so they
  fit one row. Sections get `scroll-margin-top` so headings clear the bar.
- **Project entry:**
  - Header row: name on the left; tag and links on the right (they wrap under the name on
    phones).
  - Then the summary, three highlights, and the stack line.
  - Then `<details>` with the summary text "Details" and a chevron that rotates when open.
- **Details panel:** bullets, plus at most one table. A table sits in its own
  `overflow-x: auto` wrapper, so it never scrolls the page sideways.
- **Links:**
  - Links in body text use `--accent` with an underline at reduced opacity, full on hover.
  - Nav and footer links show no underline.
- **Focus:** 2px `--accent` outline, offset 2px, on every interactive element.
- **Motion:**
  - Colour transitions of 150ms, the chevron rotation, and the pose figure's single
    2.2-second play-through.
  - All of it is turned off under `prefers-reduced-motion`; the figure shows its still
    release pose instead.

## Architecture

### Files

```
app/
  layout.tsx            fonts, metadata, colour scheme, the theme <head> script, Nav, Footer
  page.tsx              Intro, Work, OtherWork, Experience
  globals.css           tokens, base styles, a few utilities
  icon.tsx              "RV" icon in the new palette
  opengraph-image.tsx   new title and role, new palette
  not-found.tsx         simplified
  robots.ts             unchanged
  sitemap.ts            home page only
components/
  Nav.tsx
  Intro.tsx
  Section.tsx           <section id> with a small title
  ProjectEntry.tsx      featured project, its Details and its table
  OtherWork.tsx
  Experience.tsx
  Footer.tsx            contact and copyright
  ThemeToggle.tsx       light/dark switch in the nav (the one client component)
  PoseFigure.tsx        animated COCO-17 bowling skeleton in the intro
lib/
  theme.ts              inline <head> script and applyTheme()
  pose.ts               COCO-17 names, limbs and the delivery's keyframes
content/
  site.ts               name, role, intro, availability, location, links
  projects.ts           featured and other projects
  experience.ts         roles and education
next.config.ts          turbopack root and redirects; drops experimental.viewTransition
```

**Deleted:**
- `components/fx/`, `components/home/`, `components/work/`, `components/ui/`,
  `components/layout/`
- `app/work/`, `app/api/spotify/`
- `lib/gsap.ts`, `content/skills.ts`

**Dependencies removed:** `gsap`, `@gsap/react`.

All components are server components except `ThemeToggle`, the only JavaScript the page
ships of its own. Details uses the native element.

### Content model

```ts
type Link = { label: string; href: string };
type Highlight = { figure?: string; text: string };
type Table = { caption: string; columns: string[]; rows: string[][] };

type FeaturedProject = {
  slug: string;              // anchor id
  name: string;
  tag: string;               // e.g. "Khel.AI · In production"
  live?: boolean;            // amber dot before the tag
  summary: string;
  highlights: [Highlight, Highlight, Highlight];
  stack: string[];
  links: Link[];
  details: { bullets: string[]; table?: Table };
};

type OtherProject = { name: string; summary: string; links: Link[]; note?: string };
type Role = { company: string; title: string; start: string; end: string; summary: string };
type Education = { degree: string; school: string; start: string; end: string };
```

### Redirects

All redirects are temporary (307), so project pages can come back later without stale
browser caches.

| From | To |
|---|---|
| `/work/autoclip` | `/#autoclip` |
| `/work/meridian`, `/work/forge`, `/work/phalanx` | `/#other-work` |

The redirect must keep the fragment. If it doesn't, the fallback is `/`.

## Verification

- **Static checks:**
  - `npm run lint` passes.
  - `npm run build` passes with every route static.
- **Browser checks** (Playwright against `next start`, at 375×812 and 1280×800, light and
  dark):
  - No horizontal overflow: `scrollWidth <= clientWidth`.
  - Details opens and closes by click and by keyboard.
  - Nav anchors land with the heading visible below the sticky bar.
  - `/work/autoclip` lands on `/#autoclip`, and `/work/forge` on `/#other-work`.
  - No console errors.
- **Contrast:** a script computes WCAG ratios for each text token in both themes and
  requires at least 4.5:1.

## Out of scope

- Updating the CV PDF. Raghav replaces `public/RaghavVerma_CV.pdf`.
- The VLM-serving project from "Project for CV.txt", which isn't built yet.
- A blog, analytics or contact form.
- Khel.AI's other internal tools.

## Risks

- **AutoClip disclosure:** Raghav confirms the AutoClip copy above is fine to publish.
- **Lockfile:** npm 11 rewrites `package-lock.json` on any install. It adds `"peer": true`
  flags and drops the wasm-only `@emnapi/core` and `@emnapi/runtime` entries; a dry run on a
  copy showed the same changes as the uncommitted lockfile already has. That is harmless.
  What must hold after removing GSAP: no `gsap` or `@gsap/react` entries, and all 10
  `linux-x64` platform entries kept, so Linux CI installs stay intact.
