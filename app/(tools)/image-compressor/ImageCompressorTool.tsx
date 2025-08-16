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
import { motion } from "framer-motion";
import { Archive, Download, FileImage, HelpCircle, Zap } from "lucide-react";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="max-w-4xl mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className:
            "dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700",
        }}
      />

      <Card className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-white" />
            </div>
            Image Compressor Tool
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid w-full items-center gap-4">
            <Label
              htmlFor="image-upload"
              className="text-base font-medium text-slate-700 dark:text-slate-300"
            >
              Upload Image to Compress
            </Label>
            <div className="relative">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                disabled={isLoading}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                  file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 
                  hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
              />
            </div>
          </div>

          {originalImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                Original Image Preview
              </h4>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <img
                  src={URL.createObjectURL(originalImage)}
                  alt="Original preview"
                  className="max-h-64 w-full object-contain rounded-lg mx-auto"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 text-center">
                  Original Size:{" "}
                  <span className="font-semibold">
                    {(originalImage.size / 1024).toFixed(2)} KB
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 text-center"
            >
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Compressing... {progress.toFixed(0)}%
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
            >
              {error}
            </motion.div>
          )}

          {compressedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                Compressed Image Preview
              </h4>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <img
                  src={URL.createObjectURL(compressedImage)}
                  alt="Compressed preview"
                  className="max-h-64 w-full object-contain rounded-lg mx-auto"
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Compressed Size:{" "}
                    <span className="font-semibold">
                      {(compressedImage.size / 1024).toFixed(2)} KB
                    </span>
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    Reduction:{" "}
                    {originalImage &&
                      (
                        (1 - compressedImage.size / originalImage.size) *
                        100
                      ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            onClick={compressImage}
            disabled={!originalImage || isLoading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
              text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 animate-pulse" />
                Compressing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4" />
                Compress Image
              </div>
            )}
          </Button>

          {compressedImage && (
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex-1 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 
                text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}

          {(originalImage || compressedImage) && (
            <Button
              variant="ghost"
              onClick={resetTool}
              className="sm:w-auto text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Reset
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Features Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Image Compression Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Archive className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Smart Compression
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Advanced algorithms reduce file size while maintaining image
              quality. Perfect balance between compression ratio and visual
              fidelity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Multiple Formats
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Support for JPEG, PNG, WebP, and other popular image formats.
              Optimize images for web, email, or storage without quality loss.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Fast Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Lightning-fast compression with real-time progress tracking.
              Process images quickly without compromising on quality or
              security.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How Image Compression Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Upload Your Image
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Select and upload your image file. We support all major formats
              including JPEG, PNG, GIF, and WebP for maximum compatibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Smart Compression
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our advanced algorithms analyze your image and apply optimal
              compression settings to reduce file size while preserving quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Download Result
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Download your compressed image with significantly reduced file
              size and minimal quality loss. Perfect for web use and storage.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Image Compressor FAQ
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Will compressing affect image quality?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our smart compression algorithms are designed to maintain
                  visual quality while reducing file size. The compression is
                  optimized to provide the best balance between size reduction
                  and quality.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What file formats are supported?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We support all major image formats including JPEG, PNG, GIF,
                  WebP, BMP, and TIFF. The tool automatically handles format
                  optimization for best compression results.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is there a file size limit?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our tool can handle images up to several megabytes in size.
                  For very large files, the compression process may take a bit
                  longer but will still maintain optimal quality and
                  compression.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
