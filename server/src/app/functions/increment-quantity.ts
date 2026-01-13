import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { IncrementQuantityError } from './errors/increment-quantity-error'

const incrementQuantitySchema = z.object({
  linkId: z.string().min(3),
})

type IncrementQuantitySchemaType = z.input<typeof incrementQuantitySchema>

export async function incrementQuantity(
  params: IncrementQuantitySchemaType
): Promise<
  Either<IncrementQuantityError, { linkId: string; numberOfAccesses: number }>
> {
  const parsedParams = incrementQuantitySchema.safeParse(params)

  if (!parsedParams.success) {
    return makeLeft(new IncrementQuantityError(parsedParams.error.message))
  }

  const { linkId } = parsedParams.data

  const existLink = await db.query.links.findFirst({
    where: eq(schemas.links.id, linkId),
  })
  
  if (!existLink) {
    return makeLeft(new IncrementQuantityError('Link not found'))
  }

  const numberOfAccesses = existLink.numberOfAccesses + 1

  await db
    .update(schemas.links)
    .set({
      numberOfAccesses,
    })
    .where(eq(schemas.links.id, linkId))

  return makeRight({ linkId, numberOfAccesses })
}
