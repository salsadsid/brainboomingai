/**
 * What happens to text pasted into an AI tool — stated once.
 *
 * Tool pages and FAQ answers used to each carry their own sentence about this,
 * and every one of them was wrong in the same two ways: they said submissions
 * were "stored to improve our service" (true for everyone, including anonymous
 * visitors, and nobody had decided that on purpose), and that data was never
 * shared with third parties (every run goes to Google). Copy repeated in six
 * places does not get corrected in six places, so it lives here instead.
 *
 * If the behaviour changes — app/api/generate/route.tsx is where it is decided
 * — change this, and app/(marketing)/privacy/page.tsx, in the same commit.
 * FAQ answers built from this are also emitted as FAQPage JSON-LD.
 */
export const TEXT_TOOL_DATA_HANDLING =
  "Your text is sent to Google's Gemini API to produce the result. We don't store it unless you're signed in, in which case the run is saved to your private history. We use Gemini's free tier, which lets Google use submissions to improve its products, so don't paste anything confidential.";

/** The image-to-text variant: the picture itself never leaves the browser. */
export const IMAGE_TO_TEXT_DATA_HANDLING =
  "Your image is never uploaded — the text recognition runs inside your browser. Only the extracted text is sent to our server and on to Google's Gemini API to tidy it up. We don't store that text unless you're signed in, in which case the run is saved to your private history. We use Gemini's free tier, which lets Google use submissions to improve its products, so don't scan anything confidential.";
