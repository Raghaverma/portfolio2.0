/** localStorage key for the visitor's theme choice: "dark" or "light". */
export const themeStorageKey = "theme";

/** Browser theme-color per theme; tests/theme.test.ts pins these to --bg in globals.css. */
export const themeColors = { light: "#f7f5f1", dark: "#151412" } as const;

/**
 * Inlined into <head> so it runs before first paint. Light is the default in
 * globals.css, so it only re-applies a saved dark choice (no light flash for returning
 * visitors). It also creates the theme-color meta itself: React never renders one, so
 * hydration and client-side navigation can't duplicate it or reset it.
 */
export const themeScript = `(function () {
  var dark = false;
  try {
    dark = localStorage.getItem("${themeStorageKey}") === "dark";
  } catch (e) {}
  if (dark) document.documentElement.dataset.theme = "dark";
  var meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = dark ? "${themeColors.dark}" : "${themeColors.light}";
  document.head.appendChild(meta);
})();`;

/** Switches the page theme, remembers the choice, and syncs the browser's theme-color. */
export function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(themeStorageKey, dark ? "dark" : "light");
  } catch {
    // Storage blocked (private mode, policy): the switch still applies to this visit.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? themeColors.dark : themeColors.light);
}
