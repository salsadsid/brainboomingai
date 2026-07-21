import HeroSection from "@/components/home/HeroSection";
import ToolsGrid from "@/components/home/ToolsGrid";
import JsonLd from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { aiTools, allTools, otherTools, type ToolDef } from "@/config/constants";
import { toolIcons } from "@/config/toolIcons";
import { absoluteUrl } from "@/config/site";
import { jsonLdGraph } from "@/lib/seo";
import { ArrowRight, ClipboardPaste, Download, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * The home page is the site's hub. An ItemList naming every tool gives crawlers
 * an explicit inventory rather than making them infer it from the grid markup.
 */
const toolListSchema = {
  "@type": "ItemList",
  name: "Free AI tools",
  itemListElement: allTools.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tool.title,
    description: tool.description,
    url: absoluteUrl(tool.href),
  })),
};

/**
 * Every figure here is a fact about the product, not a metric we cannot back
 * up. No user counts, no ratings, no testimonials — inventing social proof for
 * a site with no analytics would be a lie a visitor could catch.
 *
 * Each value must also read as a quantity. An earlier version showed "0" over
 * the label "Accounts required", which scans as a broken or missing metric
 * rather than as the selling point it was meant to be.
 */
const STATS = [
  { value: String(allTools.length), label: "Free tools" },
  { value: String(aiTools.length), label: "AI-powered tools" },
  { value: "5,000", label: "Characters per run" },
  { value: "$0", label: "No account needed" },
];

const STEPS = [
  {
    icon: ClipboardPaste,
    title: "Paste your text",
    description:
      "Drop in a sentence, a paragraph or a full article — up to 5,000 characters.",
  },
  {
    icon: Sparkles,
    title: "Let the AI work",
    description:
      "Google Gemini processes your text and returns a result in a few seconds.",
  },
  {
    icon: Download,
    title: "Copy and go",
    description:
      "Copy the result with one click, or regenerate if you want a different take.",
  },
];

/**
 * The two tools worth leading with — highest search volume, broadest appeal.
 *
 * Each carries a worked example. The first version of these cards showed grey
 * placeholder bars as a "hint" of the output pane, which read as a loading
 * skeleton and made the page look permanently stuck mid-fetch. A real
 * before/after says more and cannot be mistaken for a pending state.
 */
const FEATURED = [
  {
    href: "/free-grammar-checker",
    before: "she dont like when it rains",
    after: "She doesn't like it when it rains",
  },
  {
    href: "/free-ai-to-human",
    before: "It is important to note that this solution is highly effective.",
    after: "This solution works — and here is why that matters.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

/** Large card for a headline tool, showing a worked example of its output. */
function FeaturedToolCard({
  tool,
  example,
}: {
  tool: ToolDef;
  example: { before: string; after: string };
}) {
  const Icon = toolIcons[tool.icon];
  return (
    <Link
      href={tool.href}
      className="gradient-border group relative flex flex-col overflow-hidden rounded-xl p-6 shadow-glow-inset transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        aria-hidden="true"
        className="bg-brand-gradient pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-[0.13] blur-2xl transition-opacity duration-300 group-hover:opacity-25"
      />

      <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-xl text-white shadow-glow">
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {tool.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>

      {/*
        Hidden from assistive tech: the card is one big link, so this text
        would be appended to its accessible name. The title and description
        already describe the tool; this is illustration for sighted users.
      */}
      <div
        aria-hidden="true"
        className="mt-6 space-y-2 rounded-lg border border-border bg-muted/50 p-3 text-sm"
      >
        <p className="text-muted-foreground line-through decoration-destructive/50">
          {example.before}
        </p>
        <p className="flex gap-2 font-medium text-foreground">
          <ArrowRight
            className="mt-1 size-3.5 shrink-0 text-success"
            aria-hidden="true"
          />
          <span>{example.after}</span>
        </p>
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Open tool
        <ArrowRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export default function Home() {
  const featured = FEATURED.map((entry) => ({
    tool: aiTools.find((t) => t.href === entry.href),
    example: entry,
  })).filter((f): f is { tool: ToolDef; example: (typeof FEATURED)[number] } =>
    Boolean(f.tool)
  );
  const featuredHrefs = FEATURED.map((f) => f.href);
  const restOfAiTools = aiTools.filter((t) => !featuredHrefs.includes(t.href));

  return (
    <>
      <JsonLd data={jsonLdGraph(toolListSchema)} />

      <HeroSection />

      {/* Stats band */}
      <section aria-label="At a glance" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gradient font-mono text-3xl font-bold md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" aria-label="AI Tools" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="AI Writing Tools"
            title="Everything you need to write better"
            description="Eight AI-powered tools for grammar, rewriting, summarising and analysis. All free, all instant."
          />

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            {featured.map(({ tool, example }) => (
              <FeaturedToolCard key={tool.href} tool={tool} example={example} />
            ))}
          </div>

          <ToolsGrid tools={restOfAiTools} columns={3} />
        </div>
      </section>

      <section aria-label="How it works" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How it works" title="Three steps, no account" />
          <ol className="relative mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <span
              aria-hidden="true"
              className="hairline-gradient absolute left-[16%] right-[16%] top-14 hidden h-px md:block"
            />
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-border bg-background p-6 shadow-glow-inset"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-gradient font-mono text-2xl font-bold">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Productivity Suite" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Utilities"
            title="Productivity suite"
            description="Image and developer utilities that run entirely in your browser — your files never leave your device."
          />
          <ToolsGrid tools={otherTools} columns={3} />
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-label="Get started" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="gradient-border relative mx-auto max-w-5xl overflow-hidden rounded-2xl px-6 py-16 text-center">
          <div aria-hidden="true" className="bg-mesh pointer-events-none absolute inset-0" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Start writing better today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
              Free to use, no signup, no credit card. Pick a tool and paste your
              text — you will have a result before you finish reading this.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" variant="gradient" className="w-full sm:w-auto">
                <Link href="/free-grammar-checker">
                  Try the Grammar Checker
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <a href="#features">Browse all tools</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
