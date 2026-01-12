import { Either, makeLeft, makeRight } from "@/shared/either";
import { z } from "zod";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { DeleteLinkError } from "./errors/delete-link-error";

const deleteLinkSchema = z.object({
  id: z.string().uuidv7(),
});

type DeleteLinkSchema = z.input<typeof deleteLinkSchema>;

export async function deleteLink(
  input: DeleteLinkSchema
): Promise<Either<DeleteLinkError, { id: string }>> {
  const resultInput = deleteLinkSchema.safeParse(input);

  if (!resultInput.success) {
    return makeLeft(new DeleteLinkError(resultInput.error.message));
  }

  const { id } = resultInput.data;

  const linkToDelete = await db
    .delete(schemas.links)
    .where(eq(schemas.links.id, id))
    .returning({ id: schemas.links.id });

  return makeRight({ id: linkToDelete[0].id });
}
