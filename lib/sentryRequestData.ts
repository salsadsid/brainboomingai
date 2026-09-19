import * as Sentry from "@sentry/nextjs";

/**
 * Keeps what visitors send us out of what we send Sentry. Two layers, shared by
 * the server and edge configs so they cannot drift apart.
 *
 * Why it is needed: by default the SDK attaches the incoming request to every
 * server-side event and transaction, including `data` — the request body — and
 * `cookies`. Neither is gated by `sendDefaultPii`; only the IP address is. For
 * `/api/generate` the body *is* the visitor's text, and the cookies carry the
 * Auth.js session token. With tracing at 100%, and a warning logged whenever a
 * result falls back to plain text, that text would have been leaving for a
 * third party on ordinary, successful requests — not just on errors.
 */

/**
 * Layer one: tell the SDK not to collect the body or cookies in the first
 * place. An integration passed with the same name replaces the default
 * instance; turning `cookies` off also drops the raw `cookie` header.
 */
export function privateRequestDataIntegration() {
  return Sentry.requestDataIntegration({
    include: { cookies: false, data: false },
  });
}

/**
 * Headers that carry the visitor's IP address. Lower-case, because that is how
 * Node delivers header names.
 */
const IP_HEADERS = new Set([
  "x-client-ip",
  "x-forwarded-for",
  "fly-client-ip",
  "cf-connecting-ip",
  "fastly-client-ip",
  "true-client-ip",
  "x-real-ip",
  "x-cluster-client-ip",
  "x-forwarded",
  "forwarded-for",
  "forwarded",
  "x-vercel-forwarded-for",
]);

/**
 * Layer two: a `beforeSend` / `beforeSendTransaction` hook that strips whatever
 * is left, so the promise does not rest on SDK defaults.
 *
 * It is not redundant. With IP collection off, SDK 10.48 removes IP headers by
 * their capitalised names (`X-Forwarded-For`), but Node lower-cases incoming
 * header names, so `x-forwarded-for` survives and the visitor's IP is sent
 * anyway. Matching case-insensitively here closes that.
 */
export function scrubRequest<T extends Sentry.Event>(event: T): T {
  const request = event.request;
  if (!request) return event;

  delete request.data;
  delete request.cookies;

  if (request.headers) {
    for (const name of Object.keys(request.headers)) {
      const lower = name.toLowerCase();
      if (lower === "cookie" || IP_HEADERS.has(lower)) {
        delete request.headers[name];
      }
    }
  }

  return event;
}
