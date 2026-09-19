import type { Event } from "@sentry/nextjs";
import { describe, expect, it } from "vitest";

import {
  privateRequestDataIntegration,
  scrubRequest,
} from "@/lib/sentryRequestData";

const visitorText = "what the visitor typed";
const sessionToken = "session-token-value";
const visitorIp = "9.9.9.9";

/**
 * Runs Sentry's own integration, configured the way this app configures it,
 * then our hook — the same order the SDK applies them — over a request shaped
 * like a real call to /api/generate. Deliberately not a test of our options
 * object: what matters is what would actually be sent, and part of that is
 * decided inside the SDK. An upgrade that changes its defaults should fail
 * here rather than quietly start shipping visitors' text.
 */
async function sentRequest(): Promise<Event["request"]> {
  const event = {
    sdkProcessingMetadata: {
      normalizedRequest: {
        method: "POST",
        url: "https://example.com/api/generate",
        query_string: "",
        // Lower-case names, as Node delivers them.
        headers: {
          "content-type": "application/json",
          cookie: `authjs.session-token=${sessionToken}`,
          "x-forwarded-for": visitorIp,
          "x-real-ip": visitorIp,
        },
        cookies: { "authjs.session-token": sessionToken },
        data: JSON.stringify({ text: visitorText, tool: "free-grammar-checker" }),
      },
    },
  };
  // No `sendDefaultPii`, as in the real configs.
  const client = { getOptions: () => ({}) };

  const processed = (await privateRequestDataIntegration().processEvent?.(
    event as never,
    {},
    client as never,
  )) as Event;

  // `sdkProcessingMetadata` is the SDK's scratch space and is never
  // transmitted; `request` is the part that leaves.
  return scrubRequest(processed).request;
}

describe("what Sentry is sent about a request", () => {
  it("leaves out the body, the cookies and the visitor's IP", async () => {
    const serialized = JSON.stringify(await sentRequest());

    expect(serialized).not.toContain(visitorText);
    expect(serialized).not.toContain(sessionToken);
    expect(serialized).not.toContain(visitorIp);
  });

  it("still reports what debugging needs", async () => {
    const request = await sentRequest();

    expect(request?.method).toBe("POST");
    expect(request?.url).toBe("https://example.com/api/generate");
    expect(request?.headers?.["content-type"]).toBe("application/json");
  });
});

describe("scrubRequest", () => {
  it("removes identifying headers whatever their casing", () => {
    const event = scrubRequest({
      request: {
        headers: {
          Cookie: "a=b",
          "X-Forwarded-For": visitorIp,
          "cf-connecting-ip": visitorIp,
          "User-Agent": "vitest",
        },
      },
    } as Event);

    expect(event.request?.headers).toEqual({ "User-Agent": "vitest" });
  });

  it("removes a body and cookies even if the SDK attached them", () => {
    const event = scrubRequest({
      request: {
        data: { text: visitorText },
        cookies: { session: sessionToken },
      },
    } as Event);

    expect(event.request).toEqual({});
  });

  it("passes through events that carry no request", () => {
    const event = { message: "client-side error" } as Event;

    expect(scrubRequest(event)).toBe(event);
  });
});
