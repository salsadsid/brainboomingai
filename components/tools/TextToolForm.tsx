"use client";

import AuthCTA from "@/components/auth/AuthCTA";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { GenerateError, useGenerate } from "@/hooks/useGenerate";
import { logger } from "@/lib/logger";
import { characterCount } from "@/utils/characterCount";
import { renderMarkdown } from "@/utils/sanitizeHtml";
import { wordCount } from "@/utils/wordCount";
import {
  Clipboard,
  ClipboardCheck,
  FileWarning,
  RotateCw,
  Trash2,
} from "lucide-react";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import type { TextToolConfig } from "./types";

const MAX_INPUT_LENGTH = 5000;

interface Output {
  id: string;
  content: string;
}

function PaneShell({
  label,
  action,
  children,
  className = "",
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-glow-inset ${className}`}
    >
      <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export default function TextToolForm({ config }: { config: TextToolConfig }) {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generateResponse, { isLoading }] = useGenerate();
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  const schema = useMemo(
    () =>
      z.object({
        content: z
          .string()
          .min(
            config.minInputLength,
            config.minInputLength === 1
              ? "Input cannot be empty"
              : "Input cannot be empty or too short"
          )
          .max(
            MAX_INPUT_LENGTH,
            `Input exceeds ${MAX_INPUT_LENGTH} character limit`
          ),
      }),
    [config.minInputLength]
  );

  const processResult = useCallback(
    async (inputText: string) => {
      setError(null);
      try {
        const validation = schema.safeParse({ content: inputText });
        if (!validation.success) {
          validation.error.issues.forEach((issue) => {
            setError(issue.message);
            if (issue.message === "Input cannot be empty") {
              textareaRef.current?.textArea.focus();
            }
          });
          return;
        }

        const modifiedPrompt = config.buildPrompt(inputText);
        const result = await generateResponse({
          prompt: modifiedPrompt,
          tool: config.toolSlug,
        });

        setOutputs((prev) => [
          { id: crypto.randomUUID(), content: result || config.fallbackMessage },
          ...prev,
        ]);
        toast.success(config.successMessage);
      } catch (err) {
        logger.error(`${config.toolSlug} error`, err);
        // The API's own message is already user-safe and says something the
        // tool's generic copy cannot — e.g. that the provider is briefly busy
        // and the run is worth retrying.
        toast.error(
          err instanceof GenerateError ? err.message : config.errorMessage
        );
      }
    },
    [config, generateResponse, schema]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await processResult(input);
    },
    [input, processResult]
  );

  const copyToClipboard = async (text: string, id: string) => {
    try {
      const copyText = config.parseCopyText ? config.parseCopyText(text) : text;
      await navigator.clipboard.writeText(copyText);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const defaultOutputStats = (output: string) =>
    `${wordCount(output)} words · ${characterCount(output)} chars`;
  const formatStats = config.formatOutputStats ?? defaultOutputStats;

  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;
  const overLimit = input.length > MAX_INPUT_LENGTH;

  const SubmitIcon = config.submitIcon;
  const [latest, ...previous] = outputs;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* ---------------- Input pane ---------------- */}
        <PaneShell
          label={config.inputLabel ?? "Your text"}
          action={
            input.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInput("");
                  setError(null);
                  textareaRef.current?.textArea.focus();
                }}
                className="h-7 text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="size-3.5" />
                Clear
              </Button>
            )
          }
        >
          <label htmlFor="tool-input" className="sr-only">
            {config.placeholder}
          </label>
          <AutosizeTextarea
            id="tool-input"
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder={config.placeholder}
            minHeight={240}
            maxHeight={520}
            maxLength={MAX_INPUT_LENGTH}
            aria-describedby={error ? "tool-input-error" : undefined}
            aria-invalid={error ? true : undefined}
            className="w-full flex-1 resize-none border-0 bg-transparent p-4 text-[0.95rem] leading-relaxed text-foreground shadow-none outline-none ring-0 placeholder:text-muted-foreground/70 focus-visible:ring-0"
          />

          <footer className="flex shrink-0 flex-col gap-3 border-t border-border p-3">
            <div className="flex items-center justify-between px-1">
              <span
                className={`font-mono text-xs ${
                  overLimit ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {input.length.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}
              </span>
              {input.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {wordCount(input)} words
                </span>
              )}
            </div>

            {error && (
              <p
                id="tool-input-error"
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
              >
                <FileWarning className="size-3.5 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={isLoading || !isInputValid}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RotateCw className="size-4 animate-spin" />
                  {config.loadingLabel}
                </>
              ) : (
                <>
                  <SubmitIcon className="size-4" />
                  {config.submitLabel}
                </>
              )}
            </Button>
          </footer>
        </PaneShell>

        {/* ---------------- Output pane ---------------- */}
        <PaneShell
          label={config.outputLabel ?? "Result"}
          action={
            latest && (
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => processResult(input)}
                  disabled={isLoading || !isInputValid}
                  className="h-7 text-muted-foreground hover:text-foreground"
                >
                  <RotateCw className="size-3.5" />
                  {config.regenerateLabel}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(latest.content, latest.id)}
                  aria-label={
                    copiedId === latest.id
                      ? "Copied to clipboard"
                      : "Copy result to clipboard"
                  }
                  className="h-7 text-muted-foreground hover:text-foreground"
                >
                  {copiedId === latest.id ? (
                    <ClipboardCheck className="size-3.5 text-success" />
                  ) : (
                    <Clipboard className="size-3.5" />
                  )}
                </Button>
              </div>
            )
          }
        >
          <div aria-live="polite" className="flex flex-1 flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex-1 space-y-3 p-4" role="status">
                <span className="sr-only">{config.loadingLabel}</span>
                {[
                  "w-full",
                  "w-[92%]",
                  "w-[97%]",
                  "w-[70%]",
                  "w-[85%]",
                  "w-[45%]",
                ].map((w, i) => (
                  <div
                    key={i}
                    className={`h-3.5 animate-pulse rounded bg-muted ${w}`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            ) : latest ? (
              <div className="flex flex-1 flex-col overflow-hidden">
                <div
                  className="prose-output flex-1 overflow-y-auto p-4"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(latest.content),
                  }}
                />
                <p className="shrink-0 border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {formatStats(latest.content)}
                </p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                <SubmitIcon
                  className="size-7 text-muted-foreground/40"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  {config.emptyStateHint ??
                    "Your result will appear here."}
                </p>
              </div>
            )}
          </div>
        </PaneShell>
      </div>

      {previous.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Previous results
          </h2>
          <div className="space-y-3">
            {previous.map((output) => (
              <details
                key={output.id}
                className="group rounded-xl border border-border bg-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <span className="truncate">
                    {output.content.replace(/[#*`_>]/g, "").slice(0, 90)}…
                  </span>
                  <span className="shrink-0 font-mono text-xs">
                    {formatStats(output.content)}
                  </span>
                </summary>
                <div className="border-t border-border p-4">
                  <div
                    className="prose-output"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(output.content),
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(output.content, output.id)}
                    className="mt-4"
                  >
                    {copiedId === output.id ? (
                      <ClipboardCheck className="size-3.5 text-success" />
                    ) : (
                      <Clipboard className="size-3.5" />
                    )}
                    Copy
                  </Button>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {outputs.length > 0 && <AuthCTA />}
    </form>
  );
}
