import type { EmailConfig } from "next-auth/providers/email";

/**
 * Custom Auth.js email (magic-link) provider that sends via Brevo's
 * transactional email HTTP API instead of SMTP.
 *
 * Why HTTP and not SMTP: Vercel serverless functions handle raw SMTP poorly
 * (per-invocation connections, cold-start timeouts). An HTTP API call is fast
 * and reliable there. Brevo's free tier (300 emails/day) needs no domain and
 * no credit card — you verify a single sender address.
 *
 * Modeled on @auth/core's Resend provider (providers/resend.js).
 */

interface BrevoConfig {
  /** Brevo API key — Settings → SMTP & API → API Keys */
  apiKey: string;
  /** Verified sender email — Brevo → Senders, Domains & Dedicated IPs → Senders */
  from: string;
  /** Sender display name shown in the recipient's inbox */
  fromName?: string;
}

const APP_NAME = "Brain Booming";
const BRAND = "#4f46e5"; // indigo-600, matches the sign-in UI

function renderHtml(url: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f1f5f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;font-family:Helvetica,Arial,sans-serif;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;">
          <tr><td style="padding:36px 40px 4px;text-align:center;font-size:20px;font-weight:700;color:#0f172a;">${APP_NAME}</td></tr>
          <tr><td style="padding:8px 40px 4px;text-align:center;">
            <h1 style="margin:0;font-size:22px;color:#0f172a;">Sign in to your account</h1>
          </td></tr>
          <tr><td style="padding:8px 40px 24px;text-align:center;font-size:15px;line-height:22px;color:#475569;">
            Click the button below to securely sign in. This link expires in 24 hours and can be used once.
          </td></tr>
          <tr><td style="padding:0 40px 28px;text-align:center;">
            <a href="${url}" target="_blank" style="display:inline-block;background:${BRAND};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;">Sign in</a>
          </td></tr>
          <tr><td style="padding:0 40px 8px;font-size:12px;color:#94a3b8;">
            Or paste this link into your browser:
            <div style="margin-top:6px;word-break:break-all;"><a href="${url}" style="color:${BRAND};">${url}</a></div>
          </td></tr>
          <tr><td style="padding:20px 40px 36px;font-size:12px;color:#94a3b8;">
            If you didn't request this email, you can safely ignore it.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function renderText(url: string): string {
  return `Sign in to ${APP_NAME}\n\nUse this link to sign in (expires in 24 hours, one-time use):\n${url}\n\nIf you didn't request this email, you can safely ignore it.\n`;
}

export default function Brevo(config: BrevoConfig): EmailConfig {
  return {
    id: "email",
    type: "email",
    name: "Email",
    from: config.from,
    maxAge: 24 * 60 * 60, // magic link valid for 24h
    async sendVerificationRequest({ identifier: to, url }) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": config.apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: config.from, name: config.fromName ?? APP_NAME },
          to: [{ email: to }],
          subject: `Sign in to ${APP_NAME}`,
          htmlContent: renderHtml(url),
          textContent: renderText(url),
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Brevo error (${res.status}): ${detail}`);
      }
    },
    options: { apiKey: config.apiKey, from: config.from },
  };
}
