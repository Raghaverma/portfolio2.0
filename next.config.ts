import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree (multiple lockfiles exist above it).
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
