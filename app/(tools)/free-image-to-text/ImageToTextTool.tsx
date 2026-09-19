"use client";

import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem } from "@/components/tools/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_TO_TEXT_DATA_HANDLING } from "@/config/dataHandling";
import ToolResultView from "@/components/tools/results/ToolResultView";
import { GenerateError, useGenerate } from "@/hooks/useGenerate";
import { type GeneratePayload, primaryTextOf } from "@/lib/toolResults";
import { logger } from "@/lib/logger";
import {
  Clipboard,
  ClipboardCheck,
  FileImage,
  FileText,
  Scan,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImageUploader } from "./components/ImageUploader";

const features: FeatureItem[] = [
  {
    icon: Scan,
    title: "Smart Recognition",
    description:
      "OCR technology that recognizes printed text in photos of documents, scans, and screenshots, then uses AI to tidy up the result.",
  },
  {
    icon: FileImage,
    title: "PNG and JPEG",
    description:
      "Upload a PNG or JPEG image up to 1 MB. Extract text from photos, scans, and screenshots of documents with ease.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Get accurate text extraction results in seconds. Our optimized algorithms ensure fast processing without compromising accuracy.",
  },
];

const steps: StepItem[] = [
  {
    title: "Upload Your Image",
    description:
      "Upload an image containing text - a photo of a document, a screenshot, or a scanned page. PNG and JPEG are supported, up to 1 MB.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced OCR technology analyzes your image using machine learning to accurately identify and extract text with high precision.",
  },
  {
    title: "Get Editable Text",
    description:
      "Receive clean, editable text that you can copy, edit, and use immediately. Perfect for digitizing documents and notes.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What image formats are supported?",
    answer:
      "PNG and JPEG images, up to 1 MB each. PDFs and other image formats are not supported — take a screenshot of the page or convert it to PNG or JPEG first.",
  },
  {
    question: "Can it recognize handwritten text?",
    answer:
      "It is built for printed text. Very clear, neat handwriting sometimes works, but expect mistakes — printed text gives far more accurate results.",
  },
  {
    question: "How accurate is the text extraction?",
    answer:
      "Our OCR technology achieves high accuracy rates, especially with clear, high-resolution images. Factors like image quality, text size, and contrast affect the accuracy of extraction.",
  },
  {
    question: "Is my uploaded image stored or shared?",
    answer: IMAGE_TO_TEXT_DATA_HANDLING,
  },
];

const SKELETON_WIDTHS = [
  "w-full",
  "w-[92%]",
  "w-[97%]",
  "w-[70%]",
  "w-[85%]",
  "w-[45%]",
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

export default function ImageToTextTool() {
  const [imageToText, setImageToText] = useState<string>("");
  const [response, setResponse] = useState<GeneratePayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [generateResponse, { isLoading }] = useGenerate();

  useEffect(() => {
    if (imageToText) {
      const handleGenerateResponse = async () => {
        setLoading(true);
        setResponse(null);
        try {
          // The OCR output is the user's text; the server wraps it.
          const result = await generateResponse({
            text: imageToText,
            tool: "free-image-to-text",
          });
          setResponse(
            result ?? {
              format: "text",
              content: "No text could be extracted from the image.",
            }
          );
          toast.success("Text extraction complete!");
        } catch (err) {
          logger.error("Image to text error", err);
          toast.error(
            err instanceof GenerateError
              ? err.message
              : "Failed to extract text. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };
      handleGenerateResponse();
    }
  }, [imageToText, generateResponse]);

  const copyToClipboard = async (payload: GeneratePayload) => {
    try {
      await navigator.clipboard.writeText(
        payload.format === "structured" ? primaryTextOf(payload) : payload.content
      );
      setCopiedText(true);
      toast.success("Text copied to clipboard!");
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const isBusy = loading || isLoading;

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* ---------------- Upload pane ---------------- */}
        <PaneShell label="Upload image">
          <ImageUploader
            imageToText={imageToText}
            setImageToText={setImageToText}
          />
        </PaneShell>

        {/* ---------------- Output pane ---------------- */}
        <PaneShell
          label="Extracted text"
          action={
            response && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(response)}
                aria-label={
                  copiedText
                    ? "Copied to clipboard"
                    : "Copy extracted text to clipboard"
                }
                className="h-7 text-muted-foreground hover:text-foreground"
              >
                {copiedText ? (
                  <ClipboardCheck className="size-3.5 text-success" />
                ) : (
                  <Clipboard className="size-3.5" />
                )}
              </Button>
            )
          }
        >
          <div
            aria-live="polite"
            className="flex flex-1 flex-col overflow-hidden"
          >
            {isBusy ? (
              <div className="flex-1 space-y-3 p-4" role="status">
                <span className="sr-only">Extracting text</span>
                {SKELETON_WIDTHS.map((w, i) => (
                  <Skeleton
                    key={w}
                    className={`h-3.5 rounded bg-muted ${w}`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            ) : response ? (
              <ToolResultView payload={response} />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                <FileText
                  className="size-7 text-muted-foreground/40"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  Your extracted text will appear here.
                </p>
              </div>
            )}
          </div>
        </PaneShell>
      </div>

      <ToolFeatures title="Advanced OCR Features" features={features} />
      <ToolHowItWorks title="How Image to Text Works" steps={steps} />
      <ToolFAQ title="Image to Text FAQ" faqs={faqs} />
    </div>
  );
}
