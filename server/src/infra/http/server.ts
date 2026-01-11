import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { healthCheckRoute } from './routes/health-check'

const server = fastify()

server.register(fastifyCors, {
  origin: '*',
})

server.register(healthCheckRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})
