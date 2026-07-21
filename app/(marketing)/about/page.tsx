import { allTools } from "@/config/constants";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name} — a free suite of AI-powered writing and productivity tools built to work instantly in your browser, with no signup and no paywall.`,
  path: "/about",
  keywords: ["about BrainBoomingAI", "free AI tools company", "AI writing tools"],
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
        About {siteConfig.name}
      </h1>

      <div className="max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} is a collection of free, AI-powered tools for
          writing and everyday productivity. Every tool runs in your browser,
          returns results in seconds, and works without an account.
        </p>

        <h2 className="text-2xl font-semibold text-foreground pt-6">
          What we believe
        </h2>
        <p>
          Useful software should not sit behind a signup wall. Most writing
          tools ask for an email address before they will correct a single
          sentence. We took the opposite approach: open the page, paste your
          text, get your result. Accounts exist only if you want to keep a
          history of what you have generated.
        </p>

        <h2 className="text-2xl font-semibold text-foreground pt-6">
          How the tools work
        </h2>
        <p>
          Our text tools are powered by Google&apos;s Gemini models, which
          handle grammar correction, paraphrasing, summarising and content
          analysis. Image tools such as the resizer and compressor process files
          entirely in your browser, so those images never leave your device.
        </p>

        <h2 className="text-2xl font-semibold text-foreground pt-6">
          What you can use today
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {allTools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="text-primary hover:underline"
              >
                {tool.title}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-foreground pt-6">
          Get in touch
        </h2>
        <p>
          Found a bug, or want a tool we do not have yet? Reach us on our{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline"
          >
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
