// app/components/image-resizer.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function ImageResizer() {
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
    <Card className="w-full mx-auto py-8 my-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Image Resizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/50"
            }`}
        >
          <input {...getInputProps()} />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 mx-auto object-contain"
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
              }}
            />
          ) : image ? (
            <p>{image.name}</p>
          ) : (
            <p>Drag & drop an image, or click to select</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange("width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange("height", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="aspect-ratio"
            checked={lockAspectRatio}
            onChange={(e) => setLockAspectRatio(e.target.checked)}
          />
          <Label htmlFor="aspect-ratio">Lock aspect ratio</Label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(socialMediaSizes).map(([key, size]) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleSocialMediaSize(size)}
            >
              {key.replace(/([A-Z])/g, " $1").trim()} ({size.width}x
              {size.height})
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={downloadImage} disabled={!image}>
          Download Resized Image
        </Button>
      </CardFooter>
    </Card>
  );
}
