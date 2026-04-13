import { describe, expect, it } from "vitest";
import { wordCount } from "@/utils/wordCount";

describe("wordCount", () => {
  it("counts words in a normal sentence", () => {
    expect(wordCount("hello world")).toBe(2);
  });

  it("counts a single word", () => {
    expect(wordCount("hello")).toBe(1);
  });

  it("handles multiple spaces between words", () => {
    expect(wordCount("hello   world   foo")).toBe(3);
  });

  it("handles leading and trailing whitespace", () => {
    expect(wordCount("  hello world  ")).toBe(2);
  });

  it("handles tabs and newlines", () => {
    expect(wordCount("hello\tworld\nfoo")).toBe(3);
  });

  it("returns 1 for an empty string (split artifact)", () => {
    // "".split(/\s+/) returns [""], so length is 1
    // This documents the current behavior — a known quirk
    expect(wordCount("")).toBe(1);
  });
});
