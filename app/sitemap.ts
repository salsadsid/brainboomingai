import { allTools } from "@/config/constants";
import { absoluteUrl } from "@/config/site";
import type { MetadataRoute } from "next";

/** Static, indexable pages outside the tool registry. */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp per build: tools change when the app is redeployed, and
  // per-entry Date.now() would churn lastModified on every crawl for no reason.
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...allTools.map((tool) => ({
      url: absoluteUrl(tool.href),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: tool.priority ?? 0.8,
    })),
  ];
}
