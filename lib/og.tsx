import { allTools } from "@/config/constants";
import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

/** Facebook / LinkedIn / Slack / Twitter all key off 1.91:1 at this size. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BRAIN_L =
  "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z";
const BRAIN_R =
  "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z";

/**
 * Renders a share card.
 *
 * Every element is explicitly `display: flex` — Satori (the renderer behind
 * ImageResponse) supports only a subset of CSS and throws on multi-child divs
 * that do not declare it.
 */
export function renderOgImage({
  title,
  description,
  eyebrow = "Free AI Tools",
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // Opaque background: transparency renders as black on Slack and
          // Twitter dark surfaces, which is how the old square PNG broke.
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #831843 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24">
              <path d={BRAIN_L} fill="#fff" />
              <path d={BRAIN_R} fill="#fff" />
              <line
                x1="12"
                y1="5.4"
                x2="12"
                y2="17.8"
                stroke="#a855f7"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
              BRAIN BOOMING
            </div>
            <div style={{ display: "flex", fontSize: 19, color: "#c4b5fd", letterSpacing: 3 }}>
              {eyebrow.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 46 ? 62 : 74,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 29,
              color: "#ddd6fe",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              padding: "13px 28px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.28)",
              fontSize: 24,
              color: "#fff",
            }}
          >
            Free · No signup · Instant results
          </div>
          <div style={{ display: "flex", fontSize: 25, color: "#a5b4fc" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

/**
 * Share card for a tool route, keyed off the registry so the card, the page
 * metadata and the JSON-LD all describe the tool identically.
 */
export function renderToolOgImage(href: string) {
  const tool = allTools.find((t) => t.href === href);
  if (!tool) {
    return renderOgImage({
      title: siteConfig.name,
      description: siteConfig.description,
    });
  }
  return renderOgImage({
    title: tool.title,
    description: tool.description,
    eyebrow: "Free AI Tool",
  });
}
