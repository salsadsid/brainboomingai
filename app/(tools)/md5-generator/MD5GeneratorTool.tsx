"use client";

import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { motion } from "framer-motion";
import {
  Clipboard,
  ClipboardCheck,
  FileWarning,
  Hash,
  HelpCircle,
  RotateCw,
  Shield,
  Zap,
} from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const MAX_INPUT_LENGTH = 10000;
const schema = z.object({
  content: z
    .string()
    .min(1, "Input cannot be empty")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function MD5GeneratorTool() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
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
          setHashes((prev) => [data.md5, ...prev]);
          toast.success("MD5 hash generated successfully!");
        } else {
          throw new Error("Failed to generate MD5 hash");
        }
      } catch (err) {
        console.error("MD5 generation error:", err);
        toast.error("Failed to generate MD5 hash. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [input]
  );

  const copyToClipboard = async (hash: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedIndex(index);
      toast.success("MD5 hash copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy hash");
    }
  };

  const generateAnother = async () => {
    if (!input) return;
    await handleSubmit(new Event("submit") as unknown as FormEvent);
  };

  const inputStats = `${wordCount(input)} words · ${characterCount(
    input
  )} chars`;
  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;

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
                placeholder="Enter text to generate MD5 hash..."
                minHeight={180}
                maxHeight={400}
                maxLength={MAX_INPUT_LENGTH}
                className="w-full ring-2 ring-slate-200 dark:ring-slate-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                 rounded-xl p-4 text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 
                 shadow-sm border-0 resize-none transition-all duration-200
                 placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
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
              disabled={loading || !isInputValid}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Hash className="w-5 h-5" />
                  Generate MD5 Hash
                </div>
              )}
            </Button>

            {hashes.length > 0 && (
              <Button
                type="button"
                onClick={generateAnother}
                variant="outline"
                disabled={loading}
                className="sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 
                  hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-300 
                  font-semibold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
            )}
          </div>

          {loading && (
            <div className="space-y-4 animate-pulse">
              <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <Skeleton className="h-20 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>
          )}

          <div className="space-y-6">
            {hashes.map((hash, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 
                  rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Hash className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      MD5 Hash Generated · 32 characters
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(hash, index)}
                    size="sm"
                    variant="ghost"
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 
                      hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedIndex === index ? (
                      <ClipboardCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <code className="text-slate-800 dark:text-slate-200 font-mono text-sm break-all">
                    {hash}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </form>
      </div>

      {/* Features Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          MD5 Hash Generator Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Secure Hashing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate secure MD5 hash values for text data. Perfect for data
              integrity verification, password hashing, and digital signatures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Data Integrity
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Verify data integrity and detect changes in files or text. MD5
              hashes provide a unique fingerprint for any input data.
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
              Instant Generation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate MD5 hashes instantly with our fast processing algorithm.
              Support for text of any length with immediate results.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How MD5 Hash Generation Works
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
              Input Your Text
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter any text, password, or data that you want to generate an MD5
              hash for. Our tool supports text of any length.
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
              Hash Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our secure algorithm processes your input and generates a unique
              32-character MD5 hash that represents your data.
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
              Get Your Hash
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive your MD5 hash instantly and copy it to your clipboard. Use
              it for data verification, security, or storage purposes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          MD5 Generator FAQ
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
                  What is an MD5 hash?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  MD5 (Message Digest 5) is a cryptographic hash function that
                  produces a 32-character hexadecimal hash value. It's commonly
                  used for data integrity verification and digital signatures.
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
                  Is MD5 secure for passwords?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  While MD5 was widely used for password hashing, it's now
                  considered cryptographically broken for security purposes. For
                  password storage, use stronger algorithms like bcrypt, scrypt,
                  or Argon2.
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
                  What can I use MD5 hashes for?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  MD5 hashes are useful for file integrity checks, creating
                  unique identifiers, data deduplication, and non-security
                  checksums. They're still valuable for non-cryptographic
                  applications.
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
                  Is my input data stored or logged?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No, we prioritize your privacy. Your input text is processed
                  temporarily to generate the MD5 hash and is not stored on our
                  servers or logged anywhere. All processing is done securely.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
