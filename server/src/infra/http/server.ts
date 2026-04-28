import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { addLinkRoute } from './routes/add-link'
import { exportUploadsRoute } from './routes/export-uploads'
import { healthCheckRoute } from './routes/health-check'
import { validateLinksRoute } from './routes/validate-link'
import { getLinksRoute } from './routes/get-links'
import { incrementQuantityRoute } from './routes/increment-quantity'
import { deleteLinkRoute } from './routes/delete-link'
import { env } from '@/env'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)
  return reply.status(500).send({
    message: 'Internal server error',
  })
})

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brav-ly API',
      version: '1.0.0',
    },
  },

  transform: jsonSchemaTransform,
})

server.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
    theme: 'bluePlanet'
  }
})

server.register(healthCheckRoute)
server.register(exportUploadsRoute)
server.register(validateLinksRoute)
server.register(addLinkRoute)
server.register(getLinksRoute)
server.register(incrementQuantityRoute)
server.register(deleteLinkRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running on http://localhost:${env.PORT}`)
})
