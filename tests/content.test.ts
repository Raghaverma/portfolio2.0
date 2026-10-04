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

test("the copy names no hosts beyond Khel.AI, GitHub and npm", () => {
  const hosts = allCopy.match(/\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:ai|app|co|com|dev|in|io|net|org)\b/gi) ?? [];
  const allowed = new Set(["khel.ai", "github.com", "www.npmjs.com"]);
  for (const host of hosts) assert.ok(allowed.has(host.toLowerCase()), host);
});

test("technical claims stay within what their sources say", () => {
  const [autoclip, bench, cricketfm] = featured;
  // AutoClip: ByteTrack and upscaled crops are bowler-mode only; batters have a fallback.
  assert.match(autoclip?.details.bullets[0] ?? "", /^For bowlers,.*fallback/);
  // Clips are transcoded to H.264/AAC, not stream-copied.
  assert.match(autoclip?.details.bullets[1] ?? "", /re-encoded to H\.264/);
  assert.doesNotMatch(JSON.stringify(autoclip), /lossless|stream copy/i);
  // The bench gates each pipeline change against the version it replaces.
  assert.match(bench?.details.bullets[0] ?? "", /every pipeline change against the poses it replaces/);
  // The CPU saving came from the GPU crop warp and the GPU pose decode together.
  assert.match(bench?.details.bullets[2] ?? "", /GPU pose decode/);
  // 55 of the 82 videos are projected, not measured.
  assert.match(bench?.details.table?.rows[3]?.[0] ?? "", /projected/);
  // The protocol predates labels as well as results; the shot count is an estimate.
  assert.match(cricketfm?.summary ?? "", /before any cricket label or result existed/);
  assert.match(cricketfm?.details.bullets[3] ?? "", /should give/);
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
