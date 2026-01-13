import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { healthCheckRoute } from './routes/health-check'
import { exportUploadsRoute } from './routes/export-uploads'

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
  }
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(healthCheckRoute)
server.register(exportUploadsRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})
