import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/md5/route";

function jsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/md5", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/md5", () => {
  it("returns 400 when text is missing", async () => {
    const res = await POST(jsonRequest({}));
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe("Text is required");
  });

  it("returns correct MD5 hash for known input", async () => {
    const res = await POST(jsonRequest({ text: "hello" }));
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.text).toBe("hello");
    // MD5 of "hello" is well-known
    expect(data.md5).toBe("5d41402abc4b2a76b9719d911017c592");
  });

  it("returns different hashes for different inputs", async () => {
    const res1 = await POST(jsonRequest({ text: "hello" }));
    const res2 = await POST(jsonRequest({ text: "world" }));

    const data1 = await res1.json();
    const data2 = await res2.json();

    expect(data1.md5).not.toBe(data2.md5);
  });
});
