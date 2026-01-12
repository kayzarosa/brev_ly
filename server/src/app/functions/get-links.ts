import { Either, makeRight } from "@/shared/either";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { desc, count } from "drizzle-orm";

type GetLinksType = {
  links: {
    id: string
    linkOriginal: string
    linkShortened: string
    numberOfAccesses: number
  }[],
  total: number
}

export async function getLinks(): Promise<Either<never, GetLinksType>> {
  const [links, [{total}]] = await Promise.all([
    db.select({
      id: schemas.links.id,
      linkOriginal: schemas.links.linkOriginal,
      linkShortened: schemas.links.linkShortened,
      numberOfAccesses: schemas.links.numberOfAccesses
    })
      .from(schemas.links)
      .orderBy(desc(schemas.links.createdAt)),
    db.select({
      total: count(schemas.links.id)
    }).from(schemas.links)
  ])

  return makeRight({ links, total })
}
