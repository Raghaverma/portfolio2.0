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
