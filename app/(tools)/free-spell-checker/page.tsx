import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import SpellCheckerTool from "./SpellCheckerTool";

export const metadata = buildMetadata({
  title: "Free AI Spell Checker - Fix Spelling Mistakes Instantly",
  description: "Free online AI spell checker tool. Detect and correct spelling mistakes, typos, and errors instantly. Advanced context-aware spell checking for perfect writing. No signup required.",
  path: "/free-spell-checker",
  keywords: toolKeywords("/free-spell-checker"),
});

export default function FreeSpellCheckerPage() {
  return (
    <>
      <ToolSeo path="/free-spell-checker" />
      <ToolHeader href="/free-spell-checker" />
      <SpellCheckerTool />

      {/* Bottom Content */}
      <div className="mt-16 text-center">
        <div className="bg-card rounded-xl border border-border p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why Choose Our AI Spell Checker?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our advanced AI spell checker goes beyond basic spell checking to
            provide context-aware corrections that understand the meaning of
            your text. Whether you&apos;re writing emails, essays, reports, or
            creative content, our tool helps you maintain professional writing
            standards.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Perfect for Students
              </h3>
              <p className="text-sm text-muted-foreground">
                Check essays, research papers, and assignments for spelling
                errors to improve academic writing quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Professional Use
              </h3>
              <p className="text-sm text-muted-foreground">
                Ensure error-free business communications, reports, and
                professional documents with accurate spell checking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
