"use client";

import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem } from "@/components/tools/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import imageCompression from "browser-image-compression";
import { Archive, Download, FileImage, Upload, Zap } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const features: FeatureItem[] = [
  {
    icon: Archive,
    title: "Smart Compression",
    description:
      "Advanced algorithms reduce file size while maintaining image quality. Perfect balance between compression ratio and visual fidelity.",
  },
  {
    icon: FileImage,
    title: "Multiple Formats",
    description:
      "Support for JPEG, PNG, WebP, and other popular image formats. Optimize images for web, email, or storage without quality loss.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Lightning-fast compression with real-time progress tracking. Process images quickly without compromising on quality or security.",
  },
];

const steps: StepItem[] = [
  {
    title: "Upload Your Image",
    description:
      "Select and upload your image file. We support all major formats including JPEG, PNG, GIF, and WebP for maximum compatibility.",
  },
  {
    title: "Smart Compression",
    description:
      "Our advanced algorithms analyze your image and apply optimal compression settings to reduce file size while preserving quality.",
  },
  {
    title: "Download Result",
    description:
      "Download your compressed image with significantly reduced file size and minimal quality loss. Perfect for web use and storage.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Will compressing affect image quality?",
    answer:
      "Our smart compression algorithms are designed to maintain visual quality while reducing file size. The compression is optimized to provide the best balance between size reduction and quality.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support all major image formats including JPEG, PNG, GIF, WebP, BMP, and TIFF. The tool automatically handles format optimization for best compression results.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Our tool can handle images up to several megabytes in size. For very large files, the compression process may take a bit longer but will still maintain optimal quality and compression.",
  },
];

function PaneShell({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-glow-inset">
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

export default function ImageCompressorTool() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        toast.error("Please upload a valid image file");
        return;
      }
      setOriginalImage(file);
      setCompressedImage(null);
      setError(null);
      toast.success("Image uploaded successfully!");
    }
  };

  const compressImage = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const options = {
        maxSizeMB: 0.3, // Target 300KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (percentage: number) => setProgress(percentage),
      };

      const compressedBlob = await imageCompression(originalImage, options);
      setCompressedImage(compressedBlob);
      toast.success("Image compressed successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compress image");
      toast.error("Failed to compress image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      const url = URL.createObjectURL(compressedImage);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed-${originalImage?.name || "image"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    }
  };

  const resetTool = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* ---------------- Upload pane ---------------- */}
        <PaneShell
          label="Upload & settings"
          action={
            (originalImage || compressedImage) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTool}
                className="h-7 text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            )
          }
        >
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/40 p-8 text-center transition-colors hover:border-primary/50">
              <Upload
                className="mx-auto size-7 text-muted-foreground/50"
                aria-hidden="true"
              />
              <Label
                htmlFor="image-upload"
                className="mt-3 block text-sm font-medium text-foreground"
              >
                Upload Image to Compress
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                disabled={isLoading}
                className="mx-auto mt-4 h-auto max-w-xs cursor-pointer border-border bg-card py-2 text-xs text-muted-foreground shadow-none file:mr-3 file:cursor-pointer file:rounded-md file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-secondary-foreground md:text-xs"
              />
            </div>

            {originalImage && (
              <div className="animate-fade-up space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Original Image Preview
                </h3>
                <div className="rounded-xl border border-border bg-muted p-4">
                  <img
                    src={URL.createObjectURL(originalImage)}
                    alt="Original preview"
                    className="mx-auto max-h-64 w-auto rounded-lg object-contain"
                  />
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Original Size:{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {(originalImage.size / 1024).toFixed(2)} KB
                    </span>
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-2">
                <div
                  role="progressbar"
                  aria-label="Compression progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  className="h-2 w-full overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-brand-gradient transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-center font-mono text-xs text-muted-foreground">
                  Compressing... {progress.toFixed(0)}%
                </p>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
              >
                {error}
              </p>
            )}
          </div>

          <footer className="shrink-0 border-t border-border p-3">
            <Button
              onClick={compressImage}
              disabled={!originalImage || isLoading}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Archive className="size-4 animate-pulse" />
                  Compressing...
                </>
              ) : (
                <>
                  <Archive className="size-4" />
                  Compress Image
                </>
              )}
            </Button>
          </footer>
        </PaneShell>

        {/* ---------------- Result pane ---------------- */}
        <PaneShell label="Result">
          <div
            aria-live="polite"
            className="flex flex-1 flex-col overflow-hidden"
          >
            {compressedImage ? (
              <div className="animate-fade-up flex-1 space-y-3 overflow-y-auto p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Compressed Image Preview
                </h3>
                <div className="rounded-xl border border-border bg-muted p-4">
                  <img
                    src={URL.createObjectURL(compressedImage)}
                    alt="Compressed preview"
                    className="mx-auto max-h-64 w-auto rounded-lg object-contain"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      Compressed Size:{" "}
                      <span className="font-mono font-semibold text-foreground">
                        {(compressedImage.size / 1024).toFixed(2)} KB
                      </span>
                    </p>
                    <Badge variant="success" size="sm">
                      Reduction:{" "}
                      {originalImage &&
                        (
                          (1 - compressedImage.size / originalImage.size) *
                          100
                        ).toFixed(1)}
                      %
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                <Archive
                  className="size-7 text-muted-foreground/40"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  Your compressed image will appear here.
                </p>
              </div>
            )}
          </div>

          {compressedImage && (
            <footer className="shrink-0 border-t border-border p-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownload}
                className="w-full"
              >
                <Download className="size-4" />
                Download
              </Button>
            </footer>
          )}
        </PaneShell>
      </div>

      <ToolFeatures title="Image Compression Features" features={features} />
      <ToolHowItWorks title="How Image Compression Works" steps={steps} />
      <ToolFAQ title="Image Compressor FAQ" faqs={faqs} />
    </div>
  );
}
