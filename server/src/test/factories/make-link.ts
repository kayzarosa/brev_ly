import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schemas'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schemas.links>>
) {
  const linkOriginal = faker.internet.url()
  const linkShortened = faker.internet.url()

  const result = await db
    .insert(schemas.links)
    .values({
      linkOriginal: linkOriginal,
      linkShortened: linkShortened,
      numberOfAccesses: 0,
      createdAt: new Date(),
      ...overrides,
    })
    .returning()

    return result[0]
}