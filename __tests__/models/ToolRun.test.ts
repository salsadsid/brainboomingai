import { describe, expect, it } from "vitest";

import ToolRun from "@/models/ToolRun";

/**
 * `recordToolRun` swallows write errors by design, so a mistake in this schema
 * would not fail a request or a test of the route — it would just produce zero
 * rows, silently. These run the real schema offline (no connection needed for
 * `validateSync`) so that failure has somewhere to show up.
 */
describe("ToolRun schema", () => {
  it("accepts a successful run", () => {
    const doc = new ToolRun({
      tool: "free-grammar-checker",
      authenticated: false,
      inputChars: 120,
      outputChars: 118,
      latencyMs: 2400,
      aiLatencyMs: 2100,
      format: "structured",
      status: "ok",
    });

    expect(doc.validateSync()).toBeUndefined();
  });

  it("accepts a failed run, where output, model time and format are unknown", () => {
    const doc = new ToolRun({
      tool: "free-grammar-checker",
      authenticated: true,
      inputChars: 120,
      outputChars: 0,
      latencyMs: 31000,
      aiLatencyMs: null,
      format: null,
      status: "quota",
    });

    expect(doc.validateSync()).toBeUndefined();
  });

  it("rejects a status it does not know", () => {
    const doc = new ToolRun({
      tool: "free-grammar-checker",
      authenticated: false,
      inputChars: 1,
      latencyMs: 1,
      status: "maybe",
    });

    expect(doc.validateSync()?.errors.status).toBeDefined();
  });

  it("has nowhere to put content or identity", () => {
    // The collection's whole purpose is what it leaves out. Adding a path here
    // should be a deliberate act, so the full list is pinned.
    const paths = Object.keys(ToolRun.schema.paths).sort();

    expect(paths).toEqual(
      [
        "__v",
        "_id",
        "aiLatencyMs",
        "authenticated",
        "createdAt",
        "format",
        "inputChars",
        "latencyMs",
        "outputChars",
        "status",
        "tool",
        "updatedAt",
      ].sort(),
    );
  });

  it("drops fields the schema does not declare", () => {
    const doc = new ToolRun({
      tool: "free-grammar-checker",
      authenticated: false,
      inputChars: 1,
      latencyMs: 1,
      status: "ok",
      text: "what the visitor typed",
    });

    expect(doc.toObject()).not.toHaveProperty("text");
  });
});
