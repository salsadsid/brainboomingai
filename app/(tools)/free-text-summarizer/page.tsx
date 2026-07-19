import ToolSeo from "@/components/seo/ToolSeo";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import TextSummarizerTool from "./TextSummarizerTool";

export const metadata = buildMetadata({
  title: "Free AI Text Summarizer - Summarize Long Content Instantly",
  description: "Summarize long articles, documents, and content instantly with our free AI text summarizer. Extract key points and create concise summaries in seconds.",
  path: "/free-text-summarizer",
  keywords: toolKeywords("/free-text-summarizer"),
});

export default function Page() {
  return (
    <>
      <ToolSeo path="/free-text-summarizer" />
      <TextSummarizerTool />
    </>
  );
}
