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

test("light is the default and the dark toggle is server-rendered", live, async () => {
  const html = await page("/");
  assert.doesNotMatch(html, /<html[^>]*data-theme/);
  const toggle = html.match(/<button[^>]*aria-label="Dark theme"[^>]*>/)?.[0];
  assert.ok(toggle, "theme toggle missing");
  assert.match(toggle, /aria-pressed="false"/);
  // The saved-choice script must be inline in <head>, so it runs before first paint.
  const head = html.slice(0, html.indexOf("</head>"));
  assert.match(head, /<script>[^<]*localStorage[^<]*<\/script>/);
  // That script owns the theme-color meta; a server-rendered one would compete with it.
  assert.doesNotMatch(head, /<meta name="theme-color"/);
});

test("the intro has the pose figure: animated once, with a still version for reduced motion", live, async () => {
  const html = await page("/");
  const start = html.indexOf('data-pose="bowling"');
  assert.ok(start > 0, "pose figure missing");
  assert.match(html, /<div[^>]*aria-hidden="true"[^>]*data-pose="bowling"/, "decorative, hidden from screen readers");
  const figure = html.slice(start, html.indexOf("</h1>"));
  assert.equal(figure.match(/<svg/g)?.length, 2, "animated and still versions");
  assert.equal(figure.match(/<animate/g)?.length, 18, "the limbs and all 17 joints animate");
  assert.match(figure, /fill="freeze"/, "holds the release pose");
  assert.doesNotMatch(figure, /repeatCount/, "plays once");
  // Reduced motion must swap the animated drawing for the still one.
  const svgClasses = [...figure.matchAll(/<svg[^>]*class="([^"]*)"/g)].map((m) => m[1]);
  assert.match(svgClasses[0] ?? "", /\bhidden motion-safe:block\b/);
  assert.match(svgClasses[1] ?? "", /\bblock motion-safe:hidden\b/);
  // Hidden captions must stay out of text selection and find-in-page.
  for (const [, cls] of figure.matchAll(/<text[^>]*class="([^"]*)"/g)) {
    assert.match(cls, /\binvisible\b/);
    assert.match(cls, /\bselect-none\b/);
  }
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
