import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

/**
 * NOTE: This describes the data flows actually present in the codebase (Gemini
 * for text tools, MongoDB for saved generations, Sentry for errors, in-browser
 * image processing). It is a starting point, not legal advice — have it
 * reviewed before relying on it, and update it whenever a data flow changes.
 */

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the text, images and account data you submit to our free AI tools.`,
  path: "/privacy",
});

const LAST_UPDATED = "19 July 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Text you submit to our AI tools
          </h2>
          <p>
            When you use a text tool — the grammar checker, paraphrasing tool,
            summarizer, spell checker, prompt generator, originality analyzer or
            AI-to-human converter — the text you enter is sent to Google&apos;s
            Gemini API to produce your result. That processing is governed by
            Google&apos;s own privacy terms in addition to this policy.
          </p>
          <p className="mt-3">
            If you are signed in, we store the tool used, your input and the
            generated output so they can appear in your dashboard history. If
            you are not signed in, we do not associate the request with an
            identity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Images
          </h2>
          <p>
            The image resizer and image compressor run entirely inside your
            browser. Those images are never uploaded to our servers. The image-
            to-text tool is the exception: it must send the image out for
            optical character recognition in order to extract text from it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Account information
          </h2>
          <p>
            Creating an account is optional. If you sign up, we store your email
            address and, when you use Google sign-in, the basic profile details
            Google returns (name and profile image). We use this only to
            authenticate you and to show your own generation history.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Error monitoring
          </h2>
          <p>
            We use Sentry to capture application errors so we can fix them.
            Error reports can include technical context such as browser type,
            page URL and a stack trace.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            What we do not do
          </h2>
          <p>
            We do not sell your data, and we do not use the content you submit
            to train our own models.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Deleting your data
          </h2>
          <p>
            You can request deletion of your account and stored generation
            history at any time by emailing{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            Changes to this policy
          </h2>
          <p>
            If we change how data is handled, we will update this page and the
            date shown above.
          </p>
        </section>
      </div>
    </div>
  );
}
