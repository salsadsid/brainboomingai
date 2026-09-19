import ContactLink from "@/components/layout/ContactLink";
import { contact, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

/**
 * NOTE: This describes the data flows actually present in the codebase. Each
 * section maps to the code that makes it true, so it can be re-checked:
 *
 *   - text tools, history, usage records   app/api/generate/route.tsx
 *   - what a usage record may hold         models/ToolRun.ts
 *   - the per-IP request counter           lib/rateLimit.ts
 *   - sign-in email delivery               lib/email/brevo-provider.ts
 *   - page analytics                       app/layout.tsx (<Analytics />)
 *   - what Sentry is and is not sent       lib/sentryRequestData.ts,
 *                                          instrumentation-client.ts
 *   - in-browser image tools and OCR       app/(tools)/image-*, free-image-to-text
 *
 * It is a starting point, not legal advice — have it reviewed before relying on
 * it, and update it in the same commit as any change to those data flows. The
 * short version shown on tool pages lives in config/dataHandling.ts.
 */

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the text, images and account data you submit to our free AI tools.`,
  path: "/privacy",
});

const LAST_UPDATED = "19 September 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
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
            We currently use the free tier of the Gemini API. Under{" "}
            <a
              href="https://ai.google.dev/gemini-api/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google&apos;s terms for that tier
            </a>
            , Google may use the text you submit and the results it generates
            to improve its products, and human reviewers may read them. For that
            reason, please do not submit confidential or personal information.
          </p>
          <p className="mt-3">
            If you are signed in, we store the tool used, your input and the
            generated output so they can appear in your dashboard history. If
            you are not signed in, we do not store your text or the result: they
            are returned to you and kept nowhere on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Usage records
          </h2>
          <p>
            For every run of a text tool, signed in or not, we keep a record
            with no content and no identity in it: which tool ran, how long the
            text and the result were, how long it took and whether it
            succeeded. It holds no text, no account and no IP address. It tells
            us which tools are used and how fast they are.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Images
          </h2>
          <p>
            The image resizer and image compressor run entirely inside your
            browser. Those images are never uploaded to our servers. The
            image-to-text tool reads your image inside your browser as well —
            the text recognition runs on your device, and the image is never
            uploaded. Only the extracted text is sent to our server, and on to
            Gemini, to tidy it up; from there it is treated like any other text
            you submit.
          </p>
          <p className="mt-3">
            The MD5 generator sends your text to our server to compute the hash.
            It is not stored or logged.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Account information
          </h2>
          <p>
            Creating an account is optional. If you sign up, we store your email
            address and, when you use Google sign-in, the basic profile details
            Google returns (name and profile image). We use this only to
            authenticate you and to show your own generation history. Sign-in
            links are delivered by email through Brevo, which therefore
            processes your email address.
          </p>
          <p className="mt-3">
            While you are signed in, each tool use is also logged against your
            account together with your IP address, so that misuse of an account
            can be investigated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Abuse prevention
          </h2>
          <p>
            To limit automated abuse we keep a short-lived count of requests per
            IP address. Each entry expires about a minute after it is created
            and is deleted automatically within a few minutes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Analytics
          </h2>
          <p>
            We use Vercel Web Analytics to count page views. It sets no cookies,
            does not follow you across sites and does not collect personal
            data; we see aggregates such as page, referrer, country and device
            type.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Error monitoring
          </h2>
          <p>
            We use Sentry to capture application errors so we can fix them.
            Error reports can include technical context such as browser type,
            page URL and a stack trace. We configure it to leave out request
            bodies — so the text you submit is not included — along with
            cookies and IP addresses.
          </p>
          <p className="mt-3">
            For a sample of visits, and for visits where an error occurs,
            Sentry also records a session replay of the page to help us
            reproduce problems. All text on the page, and everything typed into
            it, is masked in your browser before the recording is sent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            What we do not do
          </h2>
          <p>
            We do not sell your data, and we do not use the content you submit
            to train our own models.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Deleting your data
          </h2>
          <p>
            You can request deletion of your account and stored generation
            history at any time through <ContactLink />.
            {contact.kind === "issues" &&
              " Issues there are public, so do not post your email address or any personal details — just ask for deletion, and we will reply with a private way to confirm the account is yours."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
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
