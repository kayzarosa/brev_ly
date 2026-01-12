import { randomUUID } from "node:crypto";
import { describe, it, expect } from "vitest";
import { addLink } from "./add-link";
import { isRight } from "@/infra/shared/either";
import { incrementQuantity } from "./increment-quantity";
import { uuidv7 } from "uuidv7";

describe('incrementQuantity', () => {

  it('should increment the number of accesses for a given link', async () => {
    const addResult = await addLink({
      linkOriginal: "https://example.com/to-increment",
      linkShortened: `test-${randomUUID().slice(0, 8)}`,
    });

    expect(isRight(addResult)).toBe(true);
    if (isRight(addResult)) {
      const { id } = addResult.right;

      const incrementResult = await incrementQuantity({ linkId: id });

      expect(isRight(incrementResult)).toBe(true);
      if (isRight(incrementResult)) {
        expect(incrementResult.right.linkId).toBe(id);
        expect(incrementResult.right.numberOfAccesses).toBe(1);
      }
    }
  })

  it('should return an error if the link does not exist', async () => {
    const incrementResult = await incrementQuantity({ linkId: uuidv7() });

    expect(isRight(incrementResult)).toBe(false);
  })

  it('should return a validation error for invalid UUID', async () => {
    const incrementResult = await incrementQuantity({ linkId: "invalid-uuid" });

    expect(isRight(incrementResult)).toBe(false);
  })
})