import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const TRUST_POINTS = [
  "No signup required",
  "Unlimited free use",
  "Results in seconds",
];

/** Words the mockup shows as errors, and their corrections. */
const MISTAKES = ["dont", "becuase", "freind"];
const FIXES = ["doesn't", "because", "friend"];

/**
 * A static picture of the grammar checker, drawn in CSS.
 *
 * Purely decorative — `aria-hidden`, no headings, no real controls — so it adds
 * nothing to the accessibility tree or the page outline. Competitors all lead
 * with a shot of the product; a wall of centred text was the main reason this
 * page read as a template.
 */
function ProductMockup() {
  return (
    <div
      aria-hidden="true"
      className="animate-fade-up relative mx-auto mt-16 hidden w-full max-w-4xl select-none sm:block"
      style={{ animationDelay: "440ms" }}
    >
      {/* Bloom behind the window, so it sits in light rather than on black. */}
      <div className="pointer-events-none absolute -inset-x-16 -top-10 bottom-0 -z-10">
        <div className="bg-brand-gradient absolute inset-0 rounded-[50%] opacity-20 blur-3xl" />
      </div>

      <div className="gradient-border overflow-hidden rounded-xl text-left shadow-glow-lg">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/60" />
            <span className="size-2.5 rounded-full bg-muted-foreground/40" />
            <span className="size-2.5 rounded-full bg-success/60" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-muted px-3 py-1">
            <span className="font-mono text-[0.65rem] text-muted-foreground">
              {siteConfig.url.replace("https://", "")}/free-grammar-checker
            </span>
          </div>
        </div>

        {/* Two panes, mirroring the real workspace */}
        <div className="grid gap-px bg-border/70 md:grid-cols-2">
          <div className="bg-card p-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Your text
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/85">
              She{" "}
              <span className="underline decoration-destructive decoration-wavy decoration-2 underline-offset-4">
                {MISTAKES[0]}
              </span>{" "}
              like it when it rains,{" "}
              <span className="underline decoration-destructive decoration-wavy decoration-2 underline-offset-4">
                {MISTAKES[1]}
              </span>{" "}
              her{" "}
              <span className="underline decoration-destructive decoration-wavy decoration-2 underline-offset-4">
                {MISTAKES[2]}
              </span>{" "}
              always forget an umbrella.
            </p>
          </div>

          <div className="bg-card p-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Corrected text
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/85">
              She{" "}
              <span className="rounded bg-success/15 px-1 font-medium text-success">
                {FIXES[0]}
              </span>{" "}
              like it when it rains,{" "}
              <span className="rounded bg-success/15 px-1 font-medium text-success">
                {FIXES[1]}
              </span>{" "}
              her{" "}
              <span className="rounded bg-success/15 px-1 font-medium text-success">
                {FIXES[2]}
              </span>{" "}
              always forgets an umbrella.
            </p>
          </div>
        </div>

        {/* Footer strip */}
        <div className="flex items-center justify-between gap-4 border-t border-border/70 bg-card px-4 py-3">
          <span className="font-mono text-[0.65rem] text-muted-foreground">
            96 / 5,000
          </span>
          <span className="bg-brand-gradient rounded-md px-3 py-1.5 text-[0.7rem] font-medium text-white shadow-glow">
            Check Grammar
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Server component. The previous version was a client island purely to run
 * framer-motion entrance tweens; the same effect is CSS keyframes, so the
 * whole hero now ships as static HTML.
 */
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-mesh absolute inset-0" />
        <div className="bg-grid-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="bg-glow-orb animate-orb-drift absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl" />
        <div className="bg-glow-orb animate-orb-drift-slow absolute -bottom-56 right-[-8rem] size-[34rem] rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-24 text-center sm:px-6 md:pt-32 lg:px-8">
        <Badge
          variant="primary"
          className="animate-fade-up"
          style={{ animationDelay: "40ms" }}
        >
          <Sparkles aria-hidden="true" />
          Powered by Google Gemini
        </Badge>

        <h1
          className="animate-fade-up mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          <span className="block text-foreground">
            Free AI Tools for Smarter Writing
          </span>
          <span className="text-gradient mt-2 block">
            Grammar, Paraphrasing &amp; Summarizing
          </span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          Check grammar, paraphrase sentences, summarize articles, humanize AI
          text and extract text from images — every tool is free, instant, and
          works in your browser with no signup required.
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "280ms" }}
        >
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

        <ul
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          style={{ animationDelay: "360ms" }}
        >
          {TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary"
              />
              {point}
            </li>
          ))}
        </ul>

        <ProductMockup />
      </div>
    </section>
  );
}
