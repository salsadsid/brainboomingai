import { describe, expect, it } from "vitest";
import { calculateWordFrequency } from "@/utils/calculateWordFrequency";

describe("calculateWordFrequency", () => {
  it("counts word frequencies in a sentence", () => {
    expect(calculateWordFrequency("the cat sat on the mat")).toEqual({
      the: 2,
      cat: 1,
      sat: 1,
      on: 1,
      mat: 1,
    });
  });

  it("is case insensitive", () => {
    expect(calculateWordFrequency("Hello hello HELLO")).toEqual({
      hello: 3,
    });
  });

  it("returns empty object for empty string", () => {
    expect(calculateWordFrequency("")).toEqual({});
  });

  it("handles a single word", () => {
    expect(calculateWordFrequency("word")).toEqual({ word: 1 });
  });

  it("ignores punctuation between words", () => {
    const result = calculateWordFrequency("hello, world! hello.");
    expect(result["hello"]).toBe(2);
    expect(result["world"]).toBe(1);
  });
});
