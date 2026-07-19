/**
 * Single source of truth for site identity.
 *
 * Canonical URLs, sitemap entries and JSON-LD all derive from `siteUrl`, so
 * moving to a custom domain means setting NEXT_PUBLIC_SITE_URL — nothing else.
 */

const FALLBACK_URL = "https://brainboomingai.vercel.app";

/** Trailing slashes break canonical comparison, so normalise them away. */
function normalize(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteUrl = normalize(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : FALLBACK_URL)
);

export const siteConfig = {
  name: "BrainBoomingAI",
  /** Used where a human-readable brand reads better than the packed name. */
  legalName: "Brain Booming",
  url: siteUrl,
  description:
    "Free AI tools for writing and productivity — grammar checker, paraphrasing tool, text summarizer, AI-to-human converter, image to text and more. No signup required.",
  /** Square brand mark, used as the schema.org Organization logo. */
  logo: "/icon-512.png",
  email: "hello@brainbooming.com",
  locale: "en_US",
  socials: {
    twitter: "https://twitter.com/brainbooming",
    facebook: "https://facebook.com/brainbooming",
    linkedin: "https://linkedin.com/company/brainbooming",
    github: "https://github.com/brainbooming",
  },
  /** Handle form Twitter needs for `twitter:site`. */
  twitterHandle: "@brainbooming",
} as const;

/** Absolute URL for a site-relative path. Required by canonicals and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
