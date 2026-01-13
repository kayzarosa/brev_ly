import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { redirectionLink } from '@/app/functions/redirection-link'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const redirectionLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/redirection/link',
    {
      schema: {
        summary: 'Redirect Link',
        tags: ['links'],
        querystring: z.object({
          shortened: z
            .string()
            .min(3)
            .max(100)
            .regex(/^[a-zA-Z0-9_-]+$/),
        }),
        response: {
          200: z.object({
            id: z.string(),
            linkOriginal: z.string(),
            linkShortened: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortened } = request.query

      const result = await redirectionLink({ linkShortened: shortened })

      if (isRight(result)) {
        const { id, linkShortened, linkOriginal } = unwrapEither(result)

        return reply.status(200).send({
          id: id,
          linkOriginal: linkOriginal,
          linkShortened: linkShortened,
        })
      }

      const error = unwrapEither(result)
      switch (error.constructor.name) {
        case 'ValidateLinkError':
          return reply.status(401).send({ message: error.message })
      }
    }
  )
}
