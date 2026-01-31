import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { ValidateLinkError } from "./errors/validate-link-error";

const validateLinkSchema = z.object({
  linkShortened: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

type ValidateLinkSchemaType = z.input<typeof validateLinkSchema>;

type LinkValidate = {
  id: string;
  linkOriginal: string;
  linkShortened: string;
  numberOfAccesses: number;
};

export async function validateLink(
  input: ValidateLinkSchemaType,
): Promise<Either<ValidateLinkError, LinkValidate>> {
  const resultInput = validateLinkSchema.safeParse(input);

  if (!resultInput.success) {
    return makeLeft(new ValidateLinkError(resultInput.error.message));
  }

  const { linkShortened } = resultInput.data;

  const link = await db.query.links.findFirst({
    where: eq(schemas.links.linkShortened, linkShortened),
  });

  if (!link) {
    return makeLeft(new ValidateLinkError("Link not found"));
  }

  return makeRight({
    id: link.id,
    linkOriginal: link.linkOriginal,
    linkShortened: link.linkShortened,
    numberOfAccesses: link.numberOfAccesses,
  });
}
