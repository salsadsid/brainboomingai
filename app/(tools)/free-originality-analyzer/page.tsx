import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import OriginalityAnalyzerTool from "./OriginalityAnalyzerTool";

export const metadata = buildMetadata({
  title: "Free AI Content Originality Analyzer - Detect AI Writing Patterns",
  description: "Free AI-powered writing originality analyzer. Detect AI-generated content patterns, evaluate writing voice, and get actionable suggestions to make your text more authentic. No source comparison — honest pattern analysis.",
  path: "/free-originality-analyzer",
  keywords: toolKeywords("/free-originality-analyzer"),
});

export default function OriginalityAnalyzerPage() {
  return (
    <>
      <ToolSeo path="/free-originality-analyzer" />
      <ToolHeader href="/free-originality-analyzer" />
      <OriginalityAnalyzerTool />
    </>
  );
}
