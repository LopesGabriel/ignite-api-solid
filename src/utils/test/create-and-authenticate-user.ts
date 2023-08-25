import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = 'john.doe@example.com'
  const password = '123456'
  const name = 'John Doe'

  await request(app.server).post('/users').send({
    name,
    email,
    password,
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return {
    token,
    email,
    password,
    name,
  }
}
