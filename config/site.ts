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

/** The public source repository — also where bugs and requests are tracked. */
const REPO_URL = "https://github.com/salsadsid/brainboomingai";

/**
 * The contact mailbox, once there is one. Set this single value — to an address
 * that really receives mail — and every contact link on the site switches from
 * GitHub Issues to email.
 *
 * It is null rather than a plausible-looking address on purpose. The site used
 * to show hello@brainbooming.com, on a domain that does not resolve, as its only
 * contact method: every message anyone sent it bounced.
 */
const CONTACT_EMAIL = null as string | null;

export const siteConfig = {
  name: "BrainBoomingAI",
  /** Used where a human-readable brand reads better than the packed name. */
  legalName: "Brain Booming",
  url: siteUrl,
  description:
    "Free AI tools for writing and productivity — grammar checker, paraphrasing tool, text summarizer, AI-to-human converter, image to text and more. No signup required.",
  /** Square brand mark, used as the schema.org Organization logo. */
  logo: "/icon-512.png",
  locale: "en_US",
  repoUrl: REPO_URL,
  /**
   * Only profiles that exist and belong to this project. These are emitted as
   * schema.org `sameAs` and as footer links, so a placeholder here is a claim
   * to somebody else's account — the previous twitter/facebook/linkedin/github
   * "brainbooming" handles were exactly that, and the GitHub one was a 404.
   */
  socials: {
    github: REPO_URL,
  },
} as const;

/**
 * How visitors reach the project. One object, so that every page links to the
 * same place and none can be left pointing at a channel that does not work.
 *
 * Deliberately not `siteConfig.email`: a nullable field interpolates into
 * `mailto:null` without a type error, so a missed consumer would ship broken.
 * Consumers take `contact.href` and `contact.label` instead and cannot be wrong.
 */
export type Contact =
  | { kind: "email"; href: string; label: string; address: string; external: false }
  | { kind: "issues"; href: string; label: string; external: true };

export const contact: Contact = CONTACT_EMAIL
  ? {
      kind: "email",
      href: `mailto:${CONTACT_EMAIL}`,
      label: CONTACT_EMAIL,
      address: CONTACT_EMAIL,
      external: false,
    }
  : {
      kind: "issues",
      href: `${REPO_URL}/issues`,
      label: "GitHub Issues",
      external: true,
    };

/** Absolute URL for a site-relative path. Required by canonicals and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
