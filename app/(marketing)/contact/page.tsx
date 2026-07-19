import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Mail } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team — report a bug, request a feature, or ask about our free AI writing tools.`,
  path: "/contact",
  keywords: ["contact BrainBoomingAI", "AI tools support", "report a bug"],
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
        Questions, bug reports and feature requests are all welcome. Email is
        the fastest way to reach us, and we read every message.
      </p>

      <a
        href={`mailto:${siteConfig.email}`}
        className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
      >
        <Mail className="w-5 h-5" aria-hidden="true" />
        {siteConfig.email}
      </a>

      <div className="mt-12 space-y-6 text-slate-600 dark:text-slate-300">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Reporting a problem with a tool
          </h2>
          <p>
            Tell us which tool you were using and what you expected to happen.
            If you can, include the text or file that caused the issue — it
            makes the problem far quicker to reproduce.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Suggesting a new tool
          </h2>
          <p>
            We prioritise new tools by how often they are requested, so it is
            genuinely worth sending yours in.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Privacy and your data
          </h2>
          <p>
            For questions about how we handle the text and images you submit,
            see our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
