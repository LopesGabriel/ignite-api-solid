import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = 'john.doe@example.com'
  const password = '123456'
  const name = 'John Doe'

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
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
