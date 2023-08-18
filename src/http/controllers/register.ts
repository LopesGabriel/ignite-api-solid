import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const user = await registerUseCase({
      name,
      email,
      password,
    })

    return reply.status(201).send({ data: user })
  } catch (err) {
    console.error(err)
    reply.status(409).send()
  }
}
