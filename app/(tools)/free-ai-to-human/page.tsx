import ToolSeo from "@/components/seo/ToolSeo";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import AiToHumanConverter from "./AiToHumanConverter";

export const metadata = buildMetadata({
  title: "Free AI to Human Text Converter - Transform AI Content to Natural Text",
  description: "Convert AI-generated text into natural, human-like content instantly. Free AI to human text converter with advanced algorithms. No registration required.",
  path: "/free-ai-to-human",
  keywords: toolKeywords("/free-ai-to-human"),
});

export default function Page() {
  return (
    <>
      <ToolSeo path="/free-ai-to-human" />
      <AiToHumanConverter />
    </>
  );
}
