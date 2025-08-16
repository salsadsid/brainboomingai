"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { motion } from "framer-motion";
import {
  Clipboard,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Image,
  Scan,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImageUploader } from "./components/ImageUploader";
import { free_image_to_text_prompt } from "./prompt";

export default function ImageToTextTool() {
  const [imageToText, setImageToText] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [generateResponse, { isLoading }] = useGenerateResponseMutation();

  useEffect(() => {
    if (imageToText) {
      const handleGenerateResponse = async () => {
        setLoading(true);
        setResponse(null);
        const modifiedPrompt = free_image_to_text_prompt(imageToText);
        try {
          const result = await generateResponse({
            prompt: modifiedPrompt,
            tool: "free-image-to-text",
          }).unwrap();
          setResponse(result ?? "No text could be extracted from the image.");
          toast.success("Text extraction complete!");
        } catch (err) {
          console.error("Error generating response:", err);
          toast.error("Failed to extract text. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      handleGenerateResponse();
    }
  }, [imageToText, generateResponse]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      toast.success("Text copied to clipboard!");
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
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

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-10">
        <ImageUploader
          imageToText={imageToText}
          setImageToText={setImageToText}
        />

        {(loading || isLoading) && (
          <div className="mt-8 space-y-4 animate-pulse">
            <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <Skeleton className="h-40 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 
              rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Extracted Text · {wordCount(response)} words ·{" "}
                  {characterCount(response)} chars
                </span>
              </div>
              <Button
                onClick={() => copyToClipboard(response)}
                size="sm"
                variant="ghost"
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 
                  hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedText ? (
                  <ClipboardCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <Clipboard className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div
              className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </motion.div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Advanced OCR Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Smart Recognition
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Advanced AI-powered OCR technology that accurately recognizes text
              from images, including handwritten notes, documents, and
              screenshots.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Image className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Multiple Formats
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Support for various image formats including JPEG, PNG, GIF, and
              more. Extract text from photos, PDFs, and digital documents with
              ease.
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
              Instant Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Get accurate text extraction results in seconds. Our optimized
              algorithms ensure fast processing without compromising accuracy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How Image to Text Works
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
              Upload any image containing text - photos of documents,
              screenshots, handwritten notes, or scanned papers. We support all
              major formats.
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
              AI Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our advanced OCR technology analyzes your image using machine
              learning to accurately identify and extract text with high
              precision.
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
              Get Editable Text
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive clean, editable text that you can copy, edit, and use
              immediately. Perfect for digitizing documents and notes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Image to Text FAQ
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
                  What image formats are supported?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We support all major image formats including JPEG, PNG, GIF,
                  BMP, TIFF, and WebP. You can also extract text from PDF pages
                  and various document screenshots.
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
                  Can it recognize handwritten text?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes! Our AI can recognize clear handwritten text, though
                  results may vary based on handwriting legibility. Printed text
                  generally provides the most accurate results.
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
                  How accurate is the text extraction?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our OCR technology achieves high accuracy rates, especially
                  with clear, high-resolution images. Factors like image
                  quality, text size, and contrast affect the accuracy of
                  extraction.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is my uploaded image stored or shared?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No, we prioritize your privacy. Images are processed
                  temporarily for text extraction and are not stored on our
                  servers or shared with third parties. Your data remains
                  confidential.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
