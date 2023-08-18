import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const useCase = new AuthenticateUseCase(prismaUsersRepository)

    await useCase.handle({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
