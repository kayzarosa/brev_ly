import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { InvalidLinkError } from "./errors/invalid-link-error";

const addLinkSchema = z.object({
  linkOriginal: z
    .string()
    .min(3)
    .regex(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      "Insira um endereço de site válido"
    ),
  linkShortened: z
    .string()
    .min(3)
    .max(100)
    .lowercase()
    .regex(/^[a-z0-9-]+$/),
});

type AddLinkSchemaType = z.input<typeof addLinkSchema>;

export async function addLink(
  input: AddLinkSchemaType
): Promise<Either<InvalidLinkError, { id: string }>> {
  const resultInput = addLinkSchema.safeParse(input);

  if (!resultInput.success) {
    return makeLeft(new InvalidLinkError(resultInput.error.message));
  }

  const { linkOriginal, linkShortened } = resultInput.data;

  const isExistLinkShortened = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.linkShortened, linkShortened))
    .limit(1);

  if (isExistLinkShortened.length > 0) {
    return makeLeft(new InvalidLinkError("Shortened link already registered."));
  }

  const insertLink = await db
    .insert(schemas.links)
    .values({
      linkOriginal,
      linkShortened,
    })
    .returning({ id: schemas.links.id });

  return makeRight({ id: insertLink[0].id });
}
