import type { FastifyInstance } from 'fastify'

export async function healthCheckRoute(server: FastifyInstance) {
  server.get('/health', async (_, reply) => {
    return reply.status(200).send({ status: 'ok' })
  })
}
