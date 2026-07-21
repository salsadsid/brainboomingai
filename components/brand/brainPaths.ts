/**
 * The brand brain mark, as raw path data on a 24x24 viewBox.
 *
 * Shared rather than duplicated because three renderers draw the same glyph:
 * app/icon.svg (static), lib/og.tsx (Satori, for share cards) and
 * components/brand/BrandMark.tsx (React). They must not drift apart.
 */
export const BRAIN_L =
  "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z";
export const BRAIN_R =
  "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z";

/** Centre split, drawn over the two filled lobes. */
export const BRAIN_SPLIT = { x: 12, y1: 5.4, y2: 17.8, width: 2.2 } as const;
