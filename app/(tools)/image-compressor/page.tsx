// app/components/image-compressor.tsx
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
import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";

export default function ImageCompressor() {
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
        return;
      }
      setOriginalImage(file);
      setCompressedImage(null);
      setError(null);
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

      // Verify the compressed size
      //   if (compressedBlob.size > 307200) {
      //     // 300KB in bytes
      //     throw new Error("Compression failed to reach target size");
      //   }

      setCompressedImage(compressedBlob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compress image");
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
    }
  };

  return (
    <Card className="w-full mx-auto py-8 my-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Image Compressor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            disabled={isLoading}
          />

          {originalImage && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Original Image Preview
              </h4>
              <img
                src={URL.createObjectURL(originalImage)}
                alt="Original preview"
                className="max-h-48 object-contain rounded"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Original Size: {(originalImage.size / 1024).toFixed(2)}KB
              </p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-2">
              {/* <Progress value={progress} className="h-2" /> */}
              <p className="text-sm text-muted-foreground">
                Compressing... {progress.toFixed(0)}%
              </p>
            </div>
          )}

          {error && (
            // <Alert variant="destructive">
            //   <AlertDescription>{error}</AlertDescription>
            // </Alert>
            <p>{error}</p>
          )}

          {compressedImage && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Compressed Image Preview
              </h4>
              <img
                src={URL.createObjectURL(compressedImage)}
                alt="Compressed preview"
                className="max-h-48 object-contain rounded"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Compressed Size: {(compressedImage.size / 1024).toFixed(2)}KB
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={compressImage} disabled={!originalImage || isLoading}>
          {isLoading ? "Compressing..." : "Compress Image"}
        </Button>

        {compressedImage && (
          <Button variant="outline" onClick={handleDownload}>
            Download Compressed Image
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
