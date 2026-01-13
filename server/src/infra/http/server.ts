import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
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
import { redirectionLinksRoute } from './routes/redirection-link'
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

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(healthCheckRoute)
server.register(exportUploadsRoute)
server.register(redirectionLinksRoute)
server.register(addLinkRoute)
server.register(getLinksRoute)
server.register(incrementQuantityRoute)
server.register(deleteLinkRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running on http://localhost:${env.PORT}`)
})
