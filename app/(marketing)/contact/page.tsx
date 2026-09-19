import { contact, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team — report a bug, request a feature, or ask about our free AI writing tools.`,
  path: "/contact",
  keywords: ["contact BrainBoomingAI", "AI tools support", "report a bug"],
});

export default function ContactPage() {
  // Issues are public; email is not. The page says different things depending
  // on which one `contact` currently points at — see config/site.ts.
  const viaIssues = contact.kind === "issues";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-muted-foreground leading-relaxed mb-10">
        Questions, bug reports and feature requests are all welcome.{" "}
        {viaIssues
          ? "They are tracked in the open on GitHub — open an issue and you will get a reply there."
          : "Email is the fastest way to reach us, and we read every message."}
      </p>

      <a
        href={contact.href}
        {...(contact.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="inline-flex items-center gap-3 rounded-lg bg-brand-gradient px-6 py-4 font-semibold text-white shadow-glow transition-all hover:brightness-110"
      >
        {viaIssues ? (
          <Github className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Mail className="w-5 h-5" aria-hidden="true" />
        )}
        {viaIssues ? "Open an issue on GitHub" : contact.label}
      </a>

      <div className="mt-12 space-y-6 text-muted-foreground">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Reporting a problem with a tool
          </h2>
          <p>
            Tell us which tool you were using and what you expected to happen.
            An example that reproduces the problem makes it far quicker to fix.
            {viaIssues &&
              " Issues are public, so use a made-up example rather than your own text, and never include personal details."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Suggesting a new tool
          </h2>
          <p>
            Tell us what you would use it for. A concrete use case is the most
            useful thing a request can include.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Privacy and your data
          </h2>
          <p>
            For questions about how we handle the text and images you submit,
            see our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
