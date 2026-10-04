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
