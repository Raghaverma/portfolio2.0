import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themeColors, themeScript, themeStorageKey } from "../lib/theme.ts";

type Meta = { name?: string; content?: string };

// Runs the inline <head> script in a sandbox with stub browser globals,
// as a browser would before first paint.
function runHeadScript(getItem: (key: string) => string | null) {
  const root = { dataset: {} as Record<string, string> };
  const metas: Meta[] = [];
  runInNewContext(themeScript, {
    localStorage: { getItem },
    document: {
      documentElement: root,
      head: { appendChild: (el: Meta) => metas.push(el) },
      createElement: (): Meta => ({}),
    },
  });
  return { theme: root.dataset.theme, metas };
}

const saved = (value: string | null) => (key: string) =>
  key === themeStorageKey ? value : null;

test("a first-time visitor gets the light theme and a light theme-color", () => {
  const { theme, metas } = runHeadScript(saved(null));
  assert.equal(theme, undefined);
  assert.deepEqual(metas, [{ name: "theme-color", content: themeColors.light }]);
});

test("a visitor who chose dark gets it back before first paint", () => {
  const { theme, metas } = runHeadScript(saved("dark"));
  assert.equal(theme, "dark");
  assert.deepEqual(metas, [{ name: "theme-color", content: themeColors.dark }]);
});

test("a visitor who switched back to light stays light", () => {
  const { theme, metas } = runHeadScript(saved("light"));
  assert.equal(theme, undefined);
  assert.deepEqual(metas, [{ name: "theme-color", content: themeColors.light }]);
});

test("blocked storage falls back to light instead of throwing", () => {
  const blocked = () => {
    throw new Error("SecurityError");
  };
  const { theme, metas } = runHeadScript(blocked);
  assert.equal(theme, undefined);
  assert.deepEqual(metas, [{ name: "theme-color", content: themeColors.light }]);
});
