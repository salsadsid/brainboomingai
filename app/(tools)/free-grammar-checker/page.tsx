import ToolSeo from "@/components/seo/ToolSeo";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import GrammarCheckerTool from "./GrammarCheckerTool";

export const metadata = buildMetadata({
  title: "Free Grammar Checker - AI-Powered Grammar & Spell Check Tool",
  description: "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker. Improve your writing with intelligent suggestions and corrections.",
  path: "/free-grammar-checker",
  keywords: toolKeywords("/free-grammar-checker"),
});

export default function Page() {
  return (
    <>
      <ToolSeo path="/free-grammar-checker" />
      <GrammarCheckerTool />
    </>
  );
}
