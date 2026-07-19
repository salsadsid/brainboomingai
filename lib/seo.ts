import { absoluteUrl, siteConfig } from "@/config/site";
import type { Metadata } from "next";

interface BuildMetadataArgs {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/free-grammar-checker". Drives the canonical. */
  path: string;
  keywords?: string[];
  /** Set for private/thin routes that must stay out of the index. */
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Builds a complete, consistent metadata object for a page.
 *
 * Centralising this guarantees every page gets a canonical, OG tags and Twitter
 * card — the pieces most often forgotten when metadata is hand-written per page.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  type = "website",
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    // `images` is deliberately omitted from both blocks below. The
    // opengraph-image.tsx file convention supplies a correctly sized 1200x630
    // card per route, and an explicit `images` here would override it — which
    // is exactly how twitter:image ended up pointing at a 512x512 transparent
    // PNG that was being declared as 1200x630.
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                     */
/* ------------------------------------------------------------------ */

/** `@id` anchors let separate nodes reference one another across pages. */
const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    // The real brand mark, at its true dimensions. Previously this pointed at a
    // 512x512 file while declaring 1200x630, which Google flags as a mismatch.
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo),
      width: 512,
      height: 512,
    },
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.socials),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

interface SoftwareAppArgs {
  name: string;
  description: string;
  path: string;
  category?: string;
}

/**
 * Marks a tool page as a free web application.
 *
 * `offers` at price 0 is what makes Google surface the "Free" affordance, and
 * it is the reason these entries are worth emitting at all.
 */
export function softwareAppSchema({
  name,
  description,
  path,
  category = "UtilitiesApplication",
}: SoftwareAppArgs) {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: true,
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqEntry[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Wraps nodes into a single @graph document — one script tag per page. */
export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
