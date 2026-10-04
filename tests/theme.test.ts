import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { themeColors } from "../lib/theme.ts";

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
// Dark is opt-in through the nav toggle, which sets data-theme="dark" on <html>.
const darkAt = css.indexOf(':root[data-theme="dark"]');
const themes = {
  light: tokens(css.slice(0, Math.max(darkAt, 0))),
  dark: tokens(darkAt >= 0 ? css.slice(darkAt) : ""),
};

test("globals.css has a dark theme block", () => {
  assert.ok(darkAt > 0, 'missing :root[data-theme="dark"]');
});

test("light is the default: nothing follows the system colour scheme", () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
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

// lib/theme.ts owns the theme-color meta. If React also rendered one, hydration and
// client-side navigation would duplicate it or reset it to light under a dark page.
test("the theme colours in lib/theme.ts match --bg in both themes", () => {
  assert.equal(themeColors.light, themes.light.bg);
  assert.equal(themeColors.dark, themes.dark.bg);
});

test("app/layout.tsx leaves the theme-color meta to lib/theme.ts", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /themeColor/);
});

// Page markup must take its colours from the tokens, or dark mode breaks.
// app/icon.tsx and app/opengraph-image.tsx render images and are exempt.
const markupFiles = [
  ...readdirSync(new URL("../components/", import.meta.url), { recursive: true })
    .map((file) => String(file).replaceAll("\\", "/"))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => `components/${file}`),
  "app/page.tsx",
  "app/not-found.tsx",
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
