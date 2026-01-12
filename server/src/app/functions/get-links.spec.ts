import { randomUUID } from "node:crypto";
import { describe, it, expect } from "vitest";
import { addLink } from "./add-link";
import { isRight } from "@/infra/shared/either";
import { getLinks } from "./get-links";

describe('getLinks', () => {

  it('should retrieve the list of links including the newly added one', async () => {
    await addLink({
      linkOriginal: "https://example.com/to-get",
      linkShortened: `test-${randomUUID().slice(0, 8)}`,
    });

    const getResult = await getLinks();

    expect(isRight(getResult)).toBe(true);
    if (isRight(getResult)) {
      const { links, total } = getResult.right
      expect(Array.isArray(links)).toBe(true)
      expect(links.length).toBeGreaterThan(0)
      expect(total).toBeGreaterThan(0)
    }
  })
})  