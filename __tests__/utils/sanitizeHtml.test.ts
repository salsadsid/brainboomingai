// DOMPurify needs a real DOM to parse into. The suite defaults to the `node`
// environment for the API tests, so this one file opts into jsdom.
// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { renderMarkdown, sanitizeHtml } from "@/utils/sanitizeHtml";

describe("renderMarkdown", () => {
  // The regression this function exists for: model output is Markdown, and
  // sanitising it without parsing left the syntax visible as literal text.
  it("converts bold markers instead of leaking them as text", () => {
    const html = renderMarkdown("**Logline:** a story");
    expect(html).toContain("<strong>Logline:</strong>");
    expect(html).not.toContain("**");
  });

  it("converts headings instead of leaking hashes as text", () => {
    const html = renderMarkdown("## Creative Writing Prompt");
    expect(html).toContain("<h2>Creative Writing Prompt</h2>");
    expect(html).not.toContain("##");
  });

  it("preserves paragraph breaks that HTML would otherwise collapse", () => {
    const html = renderMarkdown("First para.\n\nSecond para.");
    expect(html.match(/<p>/g)).toHaveLength(2);
  });

  it("renders list structure", () => {
    const html = renderMarkdown("- one\n- two");
    expect(html).toContain("<ul>");
    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  it("leaves plain single-line text intact", () => {
    // Why the grammar checker looked fine on the same broken code path.
    expect(renderMarkdown("The sea is calm.")).toContain("The sea is calm.");
  });

  it("strips script tags smuggled through Markdown", () => {
    const html = renderMarkdown("hello\n\n<script>alert(1)</script>");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
  });

  it("strips event-handler attributes", () => {
    const html = renderMarkdown('<p onclick="alert(1)">click</p>');
    expect(html).not.toContain("onclick");
  });

  it("drops href on links so javascript: URLs cannot survive", () => {
    const html = renderMarkdown("[click](javascript:alert(1))");
    expect(html).not.toContain("javascript:");
  });
});

describe("sanitizeHtml", () => {
  it("keeps allowed formatting tags", () => {
    expect(sanitizeHtml("<strong>hi</strong>")).toBe("<strong>hi</strong>");
  });

  it("removes disallowed tags but keeps their text", () => {
    expect(sanitizeHtml("<script>bad</script>safe")).toBe("safe");
  });
});
