import { describe, expect, it } from "vitest";
import { characterCount } from "@/utils/characterCount";

describe("characterCount", () => {
  it("counts characters in a normal string", () => {
    expect(characterCount("hello")).toBe(5);
  });

  it("returns 0 for an empty string", () => {
    expect(characterCount("")).toBe(0);
  });

  it("counts spaces as characters", () => {
    expect(characterCount("a b")).toBe(3);
  });

  it("counts unicode characters", () => {
    expect(characterCount("cafe\u0301")).toBe(5); // café with combining accent
  });

  it("counts emoji characters (surrogate pairs)", () => {
    // JS string length counts surrogate pairs as 2
    expect(characterCount("\u{1F600}")).toBe(2);
  });
});
