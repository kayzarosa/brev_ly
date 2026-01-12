import { Either, makeLeft, makeRight } from "@/shared/either";
import { z } from "zod";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { ValidateLinkError } from "./errors/validate-link-error";

const redirectionLinkSchema = z.object({
  linkShortened: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

type RedirectionLinkSchemaType = z.input<typeof redirectionLinkSchema>;

type RedirectionLinkResultType = {
  id: string;
  linkOriginal: string;
  linkShortened: string;
};

export async function redirectionLink(
  input: RedirectionLinkSchemaType
): Promise<Either<ValidateLinkError, RedirectionLinkResultType>> {
  const resultInput = redirectionLinkSchema.safeParse(input);

  if (!resultInput.success) {
    return makeLeft(new ValidateLinkError(resultInput.error.message));
  }

  const { linkShortened } = resultInput.data;

  const link = await db
    .select({
      id: schemas.links.id,
      linkOriginal: schemas.links.linkOriginal,
      linkShortened: schemas.links.linkShortened,
    })
    .from(schemas.links)
    .where(eq(schemas.links.linkShortened, linkShortened))
    .limit(1);

  if (link.length === 0) {
    return makeLeft(new ValidateLinkError("Link not found"));
  }

  return makeRight(link[0]);
}
