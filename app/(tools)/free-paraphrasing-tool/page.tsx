import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import ParaphrasingTool from "./ParaphrasingTool";

export const metadata = buildMetadata({
  title: "Free Paraphrasing Tool - Rewrite Text & Avoid Plagiarism",
  description: "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool. Create unique content while maintaining original meaning. 100% free and secure.",
  path: "/free-paraphrasing-tool",
  keywords: toolKeywords("/free-paraphrasing-tool"),
});

export default function Page() {
  return (
    <>
      <ToolSeo path="/free-paraphrasing-tool" />
      <ToolHeader href="/free-paraphrasing-tool" />
      <ParaphrasingTool />
    </>
  );
}
