import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { exportUploads } from '@/app/functions/export-uploads'
import { unwrapEither } from '@/infra/shared/either'

export const exportUploadsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/report',
    {
      schema: {
        summary: 'Exporta um relatório de links em CSV',
        tags: ['reports'],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportUploads()

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
