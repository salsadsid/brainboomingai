"use client";

import type { GeneratePayload, ToolResult } from "@/lib/toolResults";
import { renderMarkdown } from "@/utils/sanitizeHtml";
import { Badge } from "@/components/ui/badge";
import {
  BulletList,
  CorrectionList,
  PrimaryText,
  ResultBody,
  ResultStats,
  ScoreGauge,
  SectionLabel,
} from "./primitives";

/**
 * Renders a generation result.
 *
 * Two paths, and both are first-class:
 *  - `structured` — the model returned JSON matching the tool's schema, so we
 *    render a view built for that shape.
 *  - `text` — parsing or validation failed upstream. Rather than showing an
 *    error, the raw output is rendered through the same sanitiser the whole app
 *    used before this change, so a fallback still looks deliberate.
 */
export default function ToolResultView({
  payload,
}: {
  payload: GeneratePayload;
}) {
  if (payload.format === "text") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div
          className="prose-output flex-1 overflow-y-auto p-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(payload.content) }}
        />
        <ResultStats text={payload.content} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <StructuredResult result={payload} />
    </div>
  );
}

function StructuredResult({ result }: { result: ToolResult }) {
  switch (result.tool) {
    case "free-grammar-checker":
    case "free-spell-checker": {
      const { correctedText, issueCount, corrections } = result.data;
      const noun = result.tool === "free-spell-checker" ? "spelling" : "";
      return (
        <>
          <ResultBody>
            <Badge variant={issueCount > 0 ? "primary" : "success"}>
              {issueCount === 0
                ? "No issues found"
                : `${issueCount} ${noun} ${issueCount === 1 ? "issue" : "issues"} fixed`.replace(
                    /\s+/g,
                    " ",
                  )}
            </Badge>
            <PrimaryText text={correctedText} />
            <CorrectionList corrections={corrections} />
          </ResultBody>
          <ResultStats text={correctedText} />
        </>
      );
    }

    case "free-paraphrasing-tool": {
      const { paraphrasedText, notes } = result.data;
      return (
        <>
          <ResultBody>
            <PrimaryText text={paraphrasedText} />
            {notes?.length ? <BulletList label="What changed" items={notes} /> : null}
          </ResultBody>
          <ResultStats text={paraphrasedText} />
        </>
      );
    }

    case "free-text-summarizer": {
      const { summary, keyPoints } = result.data;
      return (
        <>
          <ResultBody>
            <PrimaryText text={summary} />
            <BulletList label="Key points" items={keyPoints} />
          </ResultBody>
          <ResultStats
            text={summary}
            extra={keyPoints.length ? `${keyPoints.length} key points` : null}
          />
        </>
      );
    }

    case "free-ai-to-human": {
      const { rewrittenText, changes } = result.data;
      return (
        <>
          <ResultBody>
            <PrimaryText text={rewrittenText} />
            {changes?.length ? (
              <BulletList label="What changed" items={changes} />
            ) : null}
          </ResultBody>
          <ResultStats text={rewrittenText} />
        </>
      );
    }

    case "free-image-to-text": {
      const { extractedText } = result.data;
      return (
        <>
          <ResultBody>
            <PrimaryText text={extractedText} />
          </ResultBody>
          <ResultStats text={extractedText} />
        </>
      );
    }

    case "prompt-generator": {
      const { title, prompt, tips } = result.data;
      return (
        <>
          <ResultBody>
            <div>
              <SectionLabel>{title}</SectionLabel>
              <div className="rounded-lg border border-border bg-muted/50 p-3.5">
                <PrimaryText text={prompt} />
              </div>
            </div>
            {tips?.length ? <BulletList label="Tips" items={tips} /> : null}
          </ResultBody>
          <ResultStats text={prompt} />
        </>
      );
    }

    case "free-originality-analyzer": {
      const { score, aiIndicators, expression, voice, suggestions } =
        result.data;
      const sections = [
        { label: "AI indicators", body: aiIndicators },
        { label: "Expression", body: expression },
        { label: "Voice", body: voice },
      ];
      return (
        <>
          <ResultBody>
            <ScoreGauge score={score} />

            {/* The prompt forbids claiming any external comparison; saying so
                on screen keeps the tool honest about what it measured. */}
            <p className="rounded-lg border border-border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
              This analyses writing patterns and style. It does not compare your
              text against external sources or databases.
            </p>

            <div className="space-y-4">
              {sections.map((s) => (
                <div key={s.label}>
                  <SectionLabel>{s.label}</SectionLabel>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <BulletList label="Suggestions" items={suggestions} />
          </ResultBody>
          <ResultStats text={aiIndicators} extra={`Score ${score}/100`} />
        </>
      );
    }
  }
}
