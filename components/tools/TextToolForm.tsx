"use client";

import AuthCTA from "@/components/auth/AuthCTA";
import { logger } from "@/lib/logger";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerate } from "@/hooks/useGenerate";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { motion } from "framer-motion";
import {
  Clipboard,
  ClipboardCheck,
  FileWarning,
  RotateCw,
} from "lucide-react";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import type { TextToolConfig } from "./types";

const MAX_INPUT_LENGTH = 5000;

export default function TextToolForm({ config }: { config: TextToolConfig }) {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<{ id: string; content: string }[]>([]);
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
        toast.error(config.errorMessage);
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

  const inputStats = `${wordCount(input)} words · ${characterCount(input)} chars`;
  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;

  const SubmitIcon = config.submitIcon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="relative">
            <AutosizeTextarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              placeholder={config.placeholder}
              minHeight={180}
              maxHeight={400}
              maxLength={MAX_INPUT_LENGTH}
              className={`w-full ring-2 ring-slate-200 dark:ring-slate-600 ${config.focusRingColor}
                 rounded-xl p-4 text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900
                 shadow-sm border-0 resize-none transition-all duration-200
                 placeholder:text-slate-500 dark:placeholder:text-slate-400`}
            />
            <div
              className="absolute bottom-3 right-3 text-xs text-slate-500 dark:text-slate-400
                bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
            >
              {input.length}/{MAX_INPUT_LENGTH}
            </div>
          </div>

          {input.length > 0 && (
            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 ${config.dotColor} rounded-full`}></div>
                {inputStats}
              </span>
              {input.length > MAX_INPUT_LENGTH && (
                <span className="text-red-500 flex items-center dark:text-red-400">
                  <FileWarning className="w-4 h-4 mr-1" />
                  Exceeds character limit
                </span>
              )}
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <FileWarning className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={isLoading || !isInputValid}
            className={`flex-1 bg-gradient-to-r ${config.accentGradient} hover:${config.accentHoverGradient}
              text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
              transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <RotateCw className="w-5 h-5 animate-spin" />
                {config.loadingLabel}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <SubmitIcon className="w-5 h-5" />
                {config.submitLabel}
              </div>
            )}
          </Button>

          {outputs.length > 0 && (
            <Button
              type="button"
              onClick={() => processResult(input)}
              variant="outline"
              disabled={isLoading}
              className={`sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700
                ${config.hoverBorderColor} text-slate-700 dark:text-slate-300
                font-semibold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <RotateCw className="w-4 h-4 mr-2" />
              {config.regenerateLabel}
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <Skeleton className="h-40 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        )}

        <div className="space-y-6">
          {outputs.map((output) => (
            <motion.div
              key={output.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900
                rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${config.outputBadgeGradient} rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-white text-sm font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {formatStats(output.content)}
                  </span>
                </div>
                <Button
                  onClick={() => copyToClipboard(output.content, output.id)}
                  size="sm"
                  variant="ghost"
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200
                    hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copiedId === output.id ? (
                    <ClipboardCheck className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clipboard className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(output.content) }}
              />
            </motion.div>
          ))}
        </div>

        {outputs.length > 0 && <AuthCTA />}
      </form>
    </div>
  );
}
