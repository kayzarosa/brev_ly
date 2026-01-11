import { numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  linkOriginal: text('link_original').notNull(),
  linkShortened: text('link_shortened').notNull().unique(),
  numberOfAccesses: numeric('number_of_accesses').notNull().default('0'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
