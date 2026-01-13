import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/infra/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get links',
        tags: ['links'],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                linkOriginal: z.string(),
                linkShortened: z.string(),
                numberOfAccesses: z.number()
              })
            ),
            total: z.number()
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await getLinks()

      const data = unwrapEither(result)

      return reply.status(200).send(data)
    }
  )
}
