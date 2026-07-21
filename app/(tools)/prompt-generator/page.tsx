import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import PromptGeneratorTool from "./PromptGeneratorTool";

export const metadata = buildMetadata({
  title: "Free AI Prompt Generator - Create Custom Prompts Instantly",
  description: "Generate creative and engaging prompts for any purpose with our AI-powered prompt generator. Perfect for writers, content creators, and educators. 100% free and instant.",
  path: "/prompt-generator",
  keywords: toolKeywords("/prompt-generator"),
});

export default function Page() {
  return (
    <>
      <ToolSeo path="/prompt-generator" />
      <ToolHeader href="/prompt-generator" />
      <PromptGeneratorTool />
    </>
  );
}
