import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteLink } from '@/app/functions/delete-link'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link',
    {
      schema: {
        summary: 'Delete link',
        tags: ['links'],
        querystring: z.object({
          idLink: z.string()
        }),
        response: {
          204: z.object({
            id: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { idLink } = request.query

      const result = await deleteLink({ id: idLink })

      if (isRight(result)) {
        const { id } = unwrapEither(result)

        return reply.status(204).send({ id })
      }

      const error = unwrapEither(result)
      switch (error.constructor.name) {
        case 'DeleteLinkError':
          return reply.status(400).send({ message: error.message })
      }
    }
  )
}
