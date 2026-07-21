import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

/**
 * NOTE: Starting-point terms reflecting how the service actually operates.
 * Not legal advice — have these reviewed before relying on them.
 */

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms that apply when you use ${siteConfig.name}'s free AI writing and productivity tools.`,
  path: "/terms",
});

const LAST_UPDATED = "19 July 2026";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Using the service
          </h2>
          <p>
            {siteConfig.name} provides free online tools for writing and
            productivity. You may use them for personal or commercial work. You
            keep ownership of the text and files you submit, and of the output
            the tools produce for you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Acceptable use
          </h2>
          <p>You agree not to use the tools to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              produce content that is unlawful, harassing, or infringes someone
              else&apos;s rights;
            </li>
            <li>
              submit other people&apos;s personal or confidential information
              without permission;
            </li>
            <li>
              circumvent rate limits, or automate access in a way that degrades
              the service for others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            AI output is not guaranteed
          </h2>
          <p>
            Our text tools rely on AI models, and AI models make mistakes.
            Grammar suggestions, summaries, paraphrases and originality scores
            are suggestions, not verified facts. Review the output before
            relying on it — particularly for academic, legal, medical or
            financial work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Availability
          </h2>
          <p>
            The service is provided free of charge and &quot;as is&quot;. We do
            not guarantee uninterrupted availability, and we may change, limit
            or discontinue any tool.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Accounts
          </h2>
          <p>
            You are responsible for activity under your account. We may suspend
            accounts that breach these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Questions
          </h2>
          <p>
            Contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
