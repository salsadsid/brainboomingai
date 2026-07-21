import DOMPurify from "dompurify";
import { marked } from "marked";

const ALLOWED_TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "br",
  "span",
  // Markdown constructs the models actually emit. Without these the tags are
  // stripped and the content collapses into an undifferentiated run of text.
  "code",
  "pre",
  "blockquote",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

const ALLOWED_ATTR = ["class"];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}

/**
 * Converts model output to safe HTML.
 *
 * The models return Markdown, not HTML. Passing that straight to
 * `sanitizeHtml` was the bug behind "the prompt generator is broken": DOMPurify
 * only strips unsafe HTML, it never parses Markdown, so `**bold**` and `##`
 * survived as literal characters and every newline collapsed — HTML folds
 * whitespace — leaving one unbroken wall of text.
 *
 * Parse first, then sanitise. Never the other way round: sanitising first would
 * let Markdown syntax reconstruct tags after the safety check had already run.
 */
export function renderMarkdown(markdown: string): string {
  // `async: false` pins the synchronous overload — marked's return type is
  // string | Promise<string> otherwise, which does not fit dangerouslySetInnerHTML.
  const html = marked.parse(markdown, { async: false, gfm: true, breaks: true });
  return sanitizeHtml(html);
}
