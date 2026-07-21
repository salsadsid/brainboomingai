"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileImage, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const socialMediaSizes = {
  instagramSquare: { width: 1080, height: 1080 },
  instagramStory: { width: 1080, height: 1920 },
  twitterHeader: { width: 1500, height: 500 },
  facebookPost: { width: 1200, height: 630 },
  linkedinBanner: { width: 1584, height: 396 },
  custom250x300: { width: 250, height: 300 },
};

function PaneShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-glow-inset">
      <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </h2>
      </header>
      {children}
    </section>
  );
}

export default function ImageResizerTool() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState(socialMediaSizes.custom250x300);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);

  // Generate preview when image or dimensions change
  useEffect(() => {
    if (!image) return;

    const generatePreview = async () => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
        const previewUrl = canvas.toDataURL();
        setPreviewUrl(previewUrl);
      }
      URL.revokeObjectURL(objectUrl);
    };

    generatePreview();
  }, [image, dimensions]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      img.onload = () => {
        setOriginalAspectRatio(img.width / img.height);
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  const handleDimensionChange = (type: "width" | "height", value: string) => {
    const numericValue = parseInt(value) || 0;
    if (lockAspectRatio) {
      const ratio = originalAspectRatio;
      const newDimensions =
        type === "width"
          ? { width: numericValue, height: Math.round(numericValue / ratio) }
          : { width: Math.round(numericValue * ratio), height: numericValue };
      setDimensions(newDimensions);
    } else {
      setDimensions((prev) => ({
        ...prev,
        [type]: numericValue,
      }));
    }
  };

  const handleSocialMediaSize = (size: { width: number; height: number }) => {
    setDimensions(size);
  };

  const downloadImage = () => {
    if (!previewUrl || !image) return;

    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `resized-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* ---------------- Upload pane ---------------- */}
      <PaneShell label="Upload & dimensions">
        <div className="flex flex-1 flex-col gap-5 p-4">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/40 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload
              className="mx-auto size-7 text-muted-foreground/50"
              aria-hidden="true"
            />
            {image ? (
              <p className="mt-3 truncate text-sm font-medium text-foreground">
                {image.name}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Drag & drop an image, or click to select
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="resize-width"
                className="text-xs uppercase tracking-[0.08em] text-muted-foreground"
              >
                Width
              </Label>
              <Input
                id="resize-width"
                type="number"
                value={dimensions.width}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="resize-height"
                className="text-xs uppercase tracking-[0.08em] text-muted-foreground"
              >
                Height
              </Label>
              <Input
                id="resize-height"
                type="number"
                value={dimensions.height}
                onChange={(e) => handleDimensionChange("height", e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="aspect-ratio"
              checked={lockAspectRatio}
              onChange={(e) => setLockAspectRatio(e.target.checked)}
              className="size-4 cursor-pointer accent-primary"
            />
            <Label
              htmlFor="aspect-ratio"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              Lock aspect ratio
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(socialMediaSizes).map(([key, size]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => handleSocialMediaSize(size)}
                className="h-auto whitespace-normal px-2 py-2 text-center text-[0.7rem] leading-tight text-muted-foreground hover:text-foreground"
              >
                {key.replace(/([A-Z])/g, " $1").trim()} ({size.width}x
                {size.height})
              </Button>
            ))}
          </div>
        </div>
      </PaneShell>

      {/* ---------------- Result pane ---------------- */}
      <PaneShell label="Result">
        <div aria-live="polite" className="flex flex-1 flex-col overflow-hidden">
          {previewUrl ? (
            <>
              <div className="flex flex-1 items-center justify-center overflow-auto p-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-64 w-auto rounded-lg object-contain"
                />
              </div>
              <p className="shrink-0 border-t border-border px-4 py-2.5 text-center font-mono text-xs text-muted-foreground">
                {dimensions.width} × {dimensions.height} px
              </p>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
              <FileImage
                className="size-7 text-muted-foreground/40"
                aria-hidden="true"
              />
              <p className="text-sm text-muted-foreground">
                Your resized image will appear here.
              </p>
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-border p-3">
          {/* This tool resizes live as you type, so Download is the only
              committing action — it takes the primary treatment. */}
          <Button
            className="w-full"
            variant="gradient"
            size="lg"
            onClick={downloadImage}
            disabled={!image}
          >
            <Download className="size-4" />
            Download Resized Image
          </Button>
        </footer>
      </PaneShell>
    </div>
  );
}
