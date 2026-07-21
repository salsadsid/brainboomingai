import { ChevronDown } from "lucide-react";
import type { FAQItem } from "./types";

/**
 * Native <details>/<summary> accordion.
 *
 * Answers stay in the DOM when collapsed, which is required: the same copy is
 * emitted as FAQPage JSON-LD by components/seo/ToolSeo.tsx, and Google treats
 * structured data whose answer text is absent from the page as a mismatch.
 * A JS accordion that unmounted the answer would break that guarantee.
 */
export default function ToolFAQ({
  title,
  faqs,
}: {
  title: string;
  faqs: FAQItem[];
}) {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
              <h3 className="text-[0.95rem]">{faq.question}</h3>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
