import { absoluteUrl, siteUrl } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Deliberately narrow. The private routes (/dashboard, /admin, /signin,
        // …) are handled by `noindex` metadata instead, NOT by blocking them
        // here: a crawler that is disallowed cannot fetch the page, so it never
        // sees the noindex directive and the URL can still surface as a bare
        // link. Allowing the crawl is what actually gets them de-indexed.
        // API routes return no indexable content, so blocking them is pure win.
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // No trailing slash — `Host` expects a bare origin.
    host: siteUrl,
  };
}
