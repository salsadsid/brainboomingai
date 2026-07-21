"use client";

import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type {
  FAQItem,
  FeatureItem,
  StepItem,
} from "@/components/tools/types";
import { logger } from "@/lib/logger";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import {
  Clipboard,
  ClipboardCheck,
  FileWarning,
  Hash,
  RotateCw,
  Shield,
  Zap,
} from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const MAX_INPUT_LENGTH = 10000;
const schema = z.object({
  content: z
    .string()
    .min(1, "Input cannot be empty")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

const features: FeatureItem[] = [
  {
    icon: Hash,
    title: "Secure Hashing",
    description:
      "Generate secure MD5 hash values for text data. Perfect for data integrity verification, password hashing, and digital signatures.",
  },
  {
    icon: Shield,
    title: "Data Integrity",
    description:
      "Verify data integrity and detect changes in files or text. MD5 hashes provide a unique fingerprint for any input data.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "Generate MD5 hashes instantly with our fast processing algorithm. Support for text of any length with immediate results.",
  },
];

const steps: StepItem[] = [
  {
    title: "Input Your Text",
    description:
      "Enter any text, password, or data that you want to generate an MD5 hash for. Our tool supports text of any length.",
  },
  {
    title: "Hash Processing",
    description:
      "Our secure algorithm processes your input and generates a unique 32-character MD5 hash that represents your data.",
  },
  {
    title: "Get Your Hash",
    description:
      "Receive your MD5 hash instantly and copy it to your clipboard. Use it for data verification, security, or storage purposes.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What is an MD5 hash?",
    answer:
      "MD5 (Message Digest 5) is a cryptographic hash function that produces a 32-character hexadecimal hash value. It's commonly used for data integrity verification and digital signatures.",
  },
  {
    question: "Is MD5 secure for passwords?",
    answer:
      "While MD5 was widely used for password hashing, it's now considered cryptographically broken for security purposes. For password storage, use stronger algorithms like bcrypt, scrypt, or Argon2.",
  },
  {
    question: "What can I use MD5 hashes for?",
    answer:
      "MD5 hashes are useful for file integrity checks, creating unique identifiers, data deduplication, and non-security checksums. They're still valuable for non-cryptographic applications.",
  },
  {
    question: "Is my input data stored or logged?",
    answer:
      "No, we prioritize your privacy. Your input text is processed temporarily to generate the MD5 hash and is not stored on our servers or logged anywhere. All processing is done securely.",
  },
];

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

export default function MD5GeneratorTool() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ id: string; hash: string }[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  const generateHash = useCallback(async () => {
    setError(null);
    try {
      const validation = schema.safeParse({ content: input });
      if (!validation.success) {
        validation.error.issues.forEach((issue) => {
          setError(issue.message);
          if (issue.message === "Input cannot be empty") {
            textareaRef.current?.textArea.focus();
          }
        });
        return;
      }

      setLoading(true);
      const response = await fetch("/api/md5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      if (data.md5) {
        setHashes((prev) => [{ id: crypto.randomUUID(), hash: data.md5 }, ...prev]);
        toast.success("MD5 hash generated successfully!");
      } else {
        throw new Error("Failed to generate MD5 hash");
      }
    } catch (err) {
      logger.error("MD5 generation error", err);
      toast.error("Failed to generate MD5 hash. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await generateHash();
    },
    [generateHash]
  );

  const copyToClipboard = async (hash: string, id: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedId(id);
      toast.success("MD5 hash copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy hash");
    }
  };

  const inputStats = `${wordCount(input)} words · ${characterCount(
    input
  )} chars`;
  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;
  const overLimit = input.length > MAX_INPUT_LENGTH;

  const [latest, ...previous] = hashes;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* ---------------- Input pane ---------------- */}
          <PaneShell label="Your text">
            <label htmlFor="md5-input" className="sr-only">
              Enter text to generate MD5 hash...
            </label>
            <AutosizeTextarea
              id="md5-input"
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              placeholder="Enter text to generate MD5 hash..."
              minHeight={240}
              maxHeight={520}
              maxLength={MAX_INPUT_LENGTH}
              aria-describedby={error ? "md5-input-error" : undefined}
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
                  {input.length.toLocaleString()} /{" "}
                  {MAX_INPUT_LENGTH.toLocaleString()}
                </span>
                {input.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {inputStats}
                  </span>
                )}
              </div>

              {overLimit && (
                <p className="flex items-center gap-2 text-xs text-destructive">
                  <FileWarning className="size-3.5 shrink-0" aria-hidden="true" />
                  Exceeds character limit
                </p>
              )}

              {error && (
                <p
                  id="md5-input-error"
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
                disabled={loading || !isInputValid}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RotateCw className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Hash className="size-4" />
                    Generate MD5 Hash
                  </>
                )}
              </Button>
            </footer>
          </PaneShell>

          {/* ---------------- Output pane ---------------- */}
          <PaneShell
            label="MD5 hash"
            action={
              latest && (
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={generateHash}
                    disabled={loading}
                    className="h-7 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCw className="size-3.5" />
                    Generate Another
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(latest.hash, latest.id)}
                    aria-label={
                      copiedId === latest.id
                        ? "Copied to clipboard"
                        : "Copy MD5 hash to clipboard"
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
            <div
              aria-live="polite"
              className="flex flex-1 flex-col overflow-hidden"
            >
              {loading ? (
                <div className="flex-1 space-y-3 p-4" role="status">
                  <span className="sr-only">Generating...</span>
                  <div className="h-16 animate-pulse rounded-lg bg-muted" />
                  <div
                    className="h-3.5 w-2/5 animate-pulse rounded bg-muted"
                    style={{ animationDelay: "80ms" }}
                  />
                </div>
              ) : latest ? (
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="animate-fade-up rounded-lg border border-border bg-muted p-4">
                      <code className="font-mono text-sm break-all text-foreground">
                        {latest.hash}
                      </code>
                    </div>
                  </div>
                  <p className="shrink-0 border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    MD5 Hash Generated · 32 characters
                  </p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                  <Hash
                    className="size-7 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your MD5 hash will appear here.
                  </p>
                </div>
              )}
            </div>
          </PaneShell>
        </div>

        {previous.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Previous hashes
            </h2>
            <div className="space-y-3">
              {previous.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-xl border border-border bg-card"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <span className="truncate font-mono text-xs">
                      {item.hash}
                    </span>
                    <span className="shrink-0 font-mono text-xs">
                      32 characters
                    </span>
                  </summary>
                  <div className="border-t border-border p-4">
                    <div className="rounded-lg border border-border bg-muted p-4">
                      <code className="font-mono text-sm break-all text-foreground">
                        {item.hash}
                      </code>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(item.hash, item.id)}
                      className="mt-4"
                    >
                      {copiedId === item.id ? (
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
      </form>

      <ToolFeatures title="MD5 Hash Generator Features" features={features} />
      <ToolHowItWorks title="How MD5 Hash Generation Works" steps={steps} />
      <ToolFAQ title="MD5 Generator FAQ" faqs={faqs} />
    </div>
  );
}
