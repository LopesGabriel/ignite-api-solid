import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z
      .number()
      .refine(
        (val) => Math.abs(val) <= 90,
        'Latitude must be between -90 and 90',
      ),
    longitude: z
      .number()
      .refine(
        (val) => Math.abs(val) <= 180,
        'Longitude must be between -180 and 180',
      ),
  })

  const { description, title, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  const { gym } = await createGymUseCase.handle({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  return reply.status(201).send({ data: gym })
}
