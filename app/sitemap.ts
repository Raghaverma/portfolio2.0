import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projectSlugs } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projectSlugs.map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
