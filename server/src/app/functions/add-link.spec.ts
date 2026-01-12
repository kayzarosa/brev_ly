import { randomUUID } from "node:crypto";
import { describe, it, expect, beforeAll } from "vitest";
import { addLink } from "./add-link";
import { isRight, isLeft } from "@/shared/either";
import { ZodError } from "zod";

describe("addLink", () => {
  let linkShortenedNew: string

  beforeAll(() => {
    linkShortenedNew = `test-${randomUUID().slice(0, 8)}`
  });

  it("should add a new link successfully", async () => {
    const result = await addLink({
      linkOriginal: "https://example.com",
      linkShortened: linkShortenedNew,
    })

    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      expect(result.right).toHaveProperty("id")
    }
  })

  it("should not add a link with an existing shortened link", async () => {
    const result = await addLink({
      linkOriginal: "https://example.com/another",
      linkShortened: linkShortenedNew,
    });

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error);
    }
  })

  it("should fail when given an invalid original link", async () => {
    const result = await addLink({
      linkOriginal: "invalid-url",
      linkShortened: `test-${randomUUID().slice(0, 8)}`,
    });

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error);
    }
  })

  it("should fail when given an invalid shortened link", async () => {
    const result = await addLink({
      linkOriginal: "https://example.com",
      linkShortened: `test$%#`,
    });

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error);
    }
  })

})
