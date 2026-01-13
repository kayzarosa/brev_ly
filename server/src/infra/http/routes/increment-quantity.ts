import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { incrementQuantity } from '@/app/functions/increment-quantity'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const incrementQuantityRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/increment',
    {
      schema: {
        summary: 'Increment ',
        tags: ['links'],
        querystring: z.object({
          idLink: z.string()
        }),
        response: {
          200: z.object({
            id: z.string(),
            numberOfAccesses: z.number()
          }),
          400: z.object({
            message: z.string()
          })
        },
      },
    },
    async (request, reply) => {
      const { idLink } = request.query

      const result = await incrementQuantity({ linkId: idLink })

      if (isRight(result)) {
          const { linkId, numberOfAccesses } = unwrapEither(result)
  
          return reply.status(200).send({
            id: linkId,
            numberOfAccesses: numberOfAccesses,
          })
        }
  
        const error = unwrapEither(result)
        switch (error.constructor.name) {
          case 'IncrementQuantityError':
            return reply.status(400).send({ message: error.message })
        }
    }
  )
}
